import { Injectable } from '@angular/core';
import { Platform, normalizeURL } from 'ionic-angular';
import { File, FileEntry, FileError, Metadata } from '@ionic-native/file';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/first';

import { ConfigProvider } from '../../config/config';
import { StringUtils } from '../../utils/string';
import { CorsHttpProvider } from '../../providers/http/http';

interface IndexItem {
  name: string;
  modificationTime: Date;
  size: number;
}

interface QueueItem {
  imageUrl: string;
  resolve: (_) => void;
  reject: () => void;
}

@Injectable()
export class ImageLoaderController {
  private isCacheReady: boolean = false;
  private isInit: boolean = false;
  private processing: number = 0;
  private indexed: boolean = false;
  private currentCacheSize: number = 0;
  private queue: QueueItem[] = [];
  private currentlyProcessing: { [index: string]: Promise<any> } = {};
  private cacheIndex: IndexItem[] = [];

  constructor(
    private platform: Platform,
    private http: CorsHttpProvider,
    private file: File,
    private config: ConfigProvider
  ) {
    if (!platform.is('cordova')) {
      // we are running on a browser, or using livereload
      // plugin will not function in this case
      this.isInit = true;
      this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
    } else {
      Observable.fromEvent(document, 'deviceready').first().subscribe(() => {
        if (this.nativeAvailable) {
          this.initCache();
        } else {
          // we are running on a browser, or using livereload
          // plugin will not function in this case
          this.isInit = true;
          this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
        }
      });
    }
  }

  get nativeAvailable(): boolean {
    return File.installed();
  }

  preload(imageUrl: string): Promise<string> {
    return this.getImagePath(imageUrl);
  }

  clearCache() {
    if (!this.platform.is('cordova')) {
      return;
    }

    const clear = () => {
      if (!this.isInit) {
        setTimeout(clear.bind(this), 500);
        return;
      }

      this.isInit = false;
      this.file.removeRecursively(
        this.cacheRootDirectory,
        this.cacheDirectoryName
      ).then(() => {
        if (this.isWKWebView && !this.isIonicWKWebView) {
          this.file.removeRecursively(
            this.cacheTempRootDirectory,
            this.cacheDirectoryName
          ).catch(() => {
            // Noop catch. Removing the tempDirectory might fail,
            // as it is not persistent.
          }).then(() => {
            this.initCache(true);
          });
          return;
        }
        this.initCache(true);
      }).catch(this.throwError.bind(this));
    };

    clear();
  }

  getImagePath(imageUrl: string): Promise<string> {
    if (typeof imageUrl !== 'string' || imageUrl.length <= 0) {
      return Promise.reject('The image url provided was empty or invalid.');
    }

    return new Promise<string>((resolve, reject) => {
      if (!this.needDownload(imageUrl)) {
        resolve(imageUrl);
        return;
      }

      const getImage = () => {
        if (this.isImageUrlRelative(imageUrl)) {
          resolve(imageUrl);
        } else {
          this.getCachedImagePath(imageUrl).then(resolve).catch(() => {
            // image doesn't exist in cache, lets fetch it and save it
            this.addItemToQueue(imageUrl, resolve, reject);
          });
        }
      };

      const check = () => {
        if (this.isInit) {
          if (this.isCacheReady) {
            getImage();
            return;
          }
          this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
          resolve(imageUrl);
          return;
        }
        setTimeout(() => check(), 250);
      };
      check();
    });
  }

  removeCacheFile(localPath: string) {
    if (!this.platform.is('cordova')) {
      return;
    }

    if (!this.isCacheReady) {
      return;
    }

    if (!localPath) {
      return;
    }

    this.removeFile(localPath.substr(localPath.lastIndexOf('/') + 1)).catch(() => {
      // Noop catch.
    });
  }

  private isImageUrlRelative(imageUrl: string) {
    return !/^(https?|file):\/\/\/?/i.test(imageUrl);
  }

  private removeFile(file: string): Promise<any> {
    return this.file.removeFile(this.cacheDirectory, file).then(() => {
      if (this.isWKWebView && !this.isIonicWKWebView) {
        return this.file.removeFile(this.cacheTempDirectory, file).catch(() => {
          // Noop catch. Removing the files from tempDirectory might fail, as it is not persistent.
        });
      }
    });
  }

  private needDownload(imageUrl: string): boolean {
    return StringUtils.startsWith(imageUrl, [
      'http://',
      'https://',
      'ftp://'
    ]);
  }

  private initCache(replace?: boolean): void {
    this.createCacheDirectory(replace).catch(e => {
      this.throwError(e);
      this.isInit = true;
    }).then(() => this.indexCache()).then(() => {
      this.isCacheReady = true;
      this.isInit = true;
    });
  }

  private addFileToIndex(file: FileEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      file.getMetadata((metadata: Metadata) => {
        if (
          this.config.get().imageLoader.maxCacheAge > -1
          && (Date.now() - metadata.modificationTime.getTime()) > this.config.get().imageLoader.maxCacheAge
        ) {
          return this.removeFile(file.name);
        }

        this.currentCacheSize += metadata.size;
        this.cacheIndex.push({
          name: file.name,
          modificationTime: metadata.modificationTime,
          size: metadata.size
        });
        resolve();
      }, (error: FileError) => reject(error));
    });
  }

  private indexCache(): Promise<void> {
    this.cacheIndex = [];
    return this.file.listDir(
      this.cacheRootDirectory,
      this.cacheDirectoryName
    ).then(files => Promise.all(files.map(this.addFileToIndex.bind(this)))).then(() => {
      this.cacheIndex = this.cacheIndex.sort((a: IndexItem, b: IndexItem): number => a > b ? -1 : a < b ? 1 : 0);
      this.indexed = true;
      return Promise.resolve();
    }).catch(e => {
      this.throwError(e);
      return Promise.resolve();
    });
  }

  private maintainCacheSize(): void {
    if (this.config.get().imageLoader.maxCacheSize > -1 && this.indexed) {
      const maintain = () => {
        if (this.currentCacheSize > this.config.get().imageLoader.maxCacheSize) {
          const next: () => void = () => {
            this.currentCacheSize -= file.size;
            maintain();
          };

          const file: IndexItem = this.cacheIndex.splice(0, 1)[0];
          if (typeof file === 'undefined') return maintain();

          this.removeFile(file.name).then(() => next()).catch(() => next());
        }
      };

      maintain();
    }
  }

  private addItemToQueue(imageUrl: string, resolve, reject): void {
    this.queue.push({
      imageUrl,
      resolve,
      reject
    });

    this.processQueue();
  }

  private get canProcess(): boolean {
    return this.queue.length > 0 && this.processing < this.config.get().imageLoader.concurrency;
  }

  private processQueue() {
    if (!this.canProcess) return;

    this.processing++;

    const currentItem: QueueItem = this.queue.splice(0, 1)[0];
    if (this.currentlyProcessing[currentItem.imageUrl] === undefined) {
      this.currentlyProcessing[currentItem.imageUrl] = new Promise((resolve) => {
        // process more items concurrently if we can
        if (this.canProcess) this.processQueue();

        // function to call when done processing this item
        // this will reduce the processing number
        // then will execute this function again to process any remaining items
        const done = () => {
          this.processing--;
          this.processQueue();

          if (this.currentlyProcessing[currentItem.imageUrl] !== undefined) {
            delete this.currentlyProcessing[currentItem.imageUrl];
          }
        };

        const error = (e) => {
          currentItem.reject();
          this.throwError(e);
          done();
        };

        const localDir = this.file.cacheDirectory + '/';
        const fileName = this.createFileName(currentItem.imageUrl);
        this.http.get(currentItem.imageUrl, { responseType: 'blob' }).then((data: Blob) => {
          this.file.writeFile(localDir, fileName, data, { replace: true }).then((file: FileEntry) => {
            if (this.isCacheSpaceExceeded) {
              this.maintainCacheSize();
            }
            this.addFileToIndex(file).then(() => {
              this.getCachedImagePath(currentItem.imageUrl).then((localUrl) => {
                currentItem.resolve(localUrl);
                resolve();
                done();
                this.maintainCacheSize();
              });
            });
          }).catch((e) => {
            // Could not write image
            error(e);
          });
        }).catch((e) => {
          // Could not get image via httpClient
          error(e);
        });
      });
      return;
    }

    // Prevented same Image from loading at the same time
    this.currentlyProcessing[currentItem.imageUrl].then(() => {
      this.getCachedImagePath(currentItem.imageUrl).then((localUrl) => {
        currentItem.resolve(localUrl);
      });
    });
  }

  private getCachedImagePath(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.isCacheReady) {
        return reject();
      }

      // if we're running with livereload, ignore cache and call the resource from it's URL
      if (this.isDevServer) {
        return resolve(url);
      }

      const fileName = this.createFileName(url);
      this.file.resolveLocalFilesystemUrl(this.cacheDirectory + '/' + fileName).then((fileEntry: FileEntry) => {
        if (this.config.get().imageLoader.imageReturnType === 'base64') {
          // read the file as data url and return the base64 string.
          // should always be successful as the existence of the file
          // is alreay ensured
          this.file.readAsDataURL(this.cacheDirectory, fileName).then((base64: string) => {
            base64 = base64.replace('data:null', 'data:*/*');
            resolve(base64);
          }).catch(reject);
          return;
        }

        // now check if iOS device & using WKWebView Engine.
        // in this case only the tempDirectory is accessible,
        // therefore the file needs to be copied into that directory first!
        if (this.isIonicWKWebView) {
          // Use Ionic normalizeUrl to generate the right URL for Ionic WKWebView
          resolve(normalizeURL(fileEntry.nativeURL));
        } else if (this.isWKWebView) {
          // check if file already exists in temp directory
          this.file.resolveLocalFilesystemUrl(this.cacheTempDirectory + '/' + fileName).then((tempFileEntry: FileEntry) => {
            // file exists in temp directory
            // return native path
            resolve(tempFileEntry.nativeURL);
          }).catch(() => {
            // file does not yet exist in the temp directory.
            // copy it!
            this.file.copyFile(this.cacheDirectory, fileName, this.cacheTempDirectory, fileName).then((tempFileEntry: FileEntry) => {
              // now the file exists in the temp directory
              // return native path
              resolve(tempFileEntry.nativeURL);
            }).catch(reject);
          });
        } else {
          // return native path
          resolve(fileEntry.nativeURL);
        }
      }).catch(reject);
    });
  }

  private throwError(...args: any[]): void {
    args.unshift('ImageLoader Error: ');
    console.error.apply(console, args);
  }

  private throwWarning(...args: any[]): void {
    args.unshift('ImageLoader Warning: ');
    console.warn.apply(console, args);
  }

  private get isWKWebView(): boolean {
    return this.platform.is('ios') && (window as any).webkit && (window as any).webkit.messageHandlers;
  }

  private get isDevServer(): boolean {
    return (window['IonicDevServer'] !== undefined);
  }

  private cacheDirectoryExists(directory: string): Promise<boolean> {
    return this.file.checkDir(directory, this.cacheDirectoryName);
  }

  private get cacheRootDirectory(): string {
    return this.file.cacheDirectory;
  }

  private get cacheTempRootDirectory(): string {
    return this.file.tempDirectory;
  }

  private get cacheDirectoryName(): string {
    return this.config.get().imageLoader.cacheDirectoryName;
  }

  private get cacheDirectory(): string {
    return this.cacheRootDirectory + this.cacheDirectoryName;
  }

  private get cacheTempDirectory(): string {
    return this.cacheTempRootDirectory + this.cacheDirectoryName;
  }

  private get isCacheSpaceExceeded() {
    return (this.config.get().imageLoader.maxCacheSize > -1) && this.currentCacheSize > this.config.get().imageLoader.maxCacheSize;
  }

  private get isIonicWKWebView(): boolean {
    return this.isWKWebView && (location.host === 'localhost:8080' || (window as any).LiveReload);
  }

  private createCacheDirectory(replace: boolean = false): Promise<any> {
    let cacheDirectoryPromise: Promise<any>, tempDirectoryPromise: Promise<any>;

    if (replace) {
      // create or replace the cache directory
      cacheDirectoryPromise = this.file.createDir(this.cacheRootDirectory, this.cacheDirectoryName, replace);
    } else {
      // check if the cache directory exists.
      // if it does not exist create it!
      cacheDirectoryPromise = this.cacheDirectoryExists(this.cacheRootDirectory).catch(
        () => this.file.createDir(this.cacheRootDirectory, this.cacheDirectoryName, false)
      );
    }

    if (this.isWKWebView && !this.isIonicWKWebView) {
      if (replace) {
        // create or replace the temp directory
        tempDirectoryPromise = this.file.createDir(this.cacheTempRootDirectory, this.cacheDirectoryName, replace);
      } else {
        // check if the temp directory exists.
        // if it does not exist create it!
        tempDirectoryPromise = this.cacheDirectoryExists(this.cacheTempRootDirectory).catch(
          () => this.file.createDir(this.cacheTempRootDirectory, this.cacheDirectoryName, false)
        );
      }
    } else {
      tempDirectoryPromise = Promise.resolve();
    }

    return Promise.all([cacheDirectoryPromise, tempDirectoryPromise]);
  }

  private createFileName(url: string): string {
    return StringUtils.hash(url).toString();
  }
}
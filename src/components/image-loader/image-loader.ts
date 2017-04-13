import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File, FileEntry } from '@ionic-native/file';

import * as _ from 'lodash';

import { ConfigProvider } from '../../config/config';
import { StringUtils } from '../../utils/string';

interface IndexItem {
  name: string;
  modificationTime: Date;
  size: number;
}

interface QueueItem {
  imageUrl: string;
  resolve: Function;
  reject: Function;
}

@Injectable()
export class ImageLoaderController {
  private isCacheReady: boolean = false;
  private isInit: boolean = false;
  private processing: number = 0;
  private indexed: boolean = false;
  private currentCacheSize: number = 0;
  private queue: QueueItem[] = [];
  private cacheIndex: IndexItem[] = [];

  constructor(
    private platform: Platform,
    private transfer: Transfer,
    private file: File,
    private config: ConfigProvider
  ) {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      this.isInit = true;
      this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
      return;
    }

    platform.ready().then(() => this.initCache());
  }

  getImagePath(imageUrl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.needDownload(imageUrl)) {
        resolve(imageUrl);
        return;
      }

      const getImage = () => {
        this.getCachedImagePath(imageUrl).then(resolve).catch(() => {
          this.addItemToQueue(imageUrl, resolve, reject);
        });
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

  preload(imageUrl: string): Promise<string> {
    return this.getImagePath(imageUrl);
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

    this.file.removeFile(this.cacheDirectory, localPath.substr(localPath.lastIndexOf('/') + 1)).catch(e => {
      this.throwError(e);
    });
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
      this.file.removeRecursively(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName).then(() => {
        this.initCache(true);
      }).catch(this.throwError.bind(this));
    };

    clear();
  }

  private downloadImage(imageUrl: string, localPath: string): Promise<any> {
    const transfer = this.transfer.create();
    return transfer.download(imageUrl, localPath, true);
  }

  private needDownload(imageUrl: string): boolean {
    return StringUtils.startsWith(imageUrl, [
      'http://',
      'https://',
      'ftp://'
    ]);
  }

  private initCache(replace?: boolean): void {
    this.cacheDirectoryExists.catch(() => {
      return this.createCacheDirectory(replace).catch(e => {
        this.throwError(e);
        this.isInit = true;
      });
    }).then(() => this.indexCache()).then(() => {
      this.isCacheReady = true;
      this.isInit = true;
    });
  }

  private addFileToIndex(file: FileEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => file.getMetadata(resolve, reject)).then(metadata => {
      if (
        this.config.get().imageLoader.maxCacheAge > -1
        && (Date.now() - metadata.modificationTime.getTime()) > this.config.get().imageLoader.maxCacheAge
      ) {
        return this.file.removeFile(this.cacheDirectory, file.name);
      } else {
        this.currentCacheSize += metadata.size;

        this.cacheIndex.push({
          name: file.name,
          modificationTime: metadata.modificationTime,
          size: metadata.size
        });
        return Promise.resolve();
      }
    });
  }

  private indexCache(): Promise<void> {
    if (!this.shouldIndex) return Promise.resolve();

    this.cacheIndex = [];
    return this.file.listDir(
      this.cacheRootDirectory,
      this.config.get().imageLoader.cacheDirectoryName
    ).then(files => Promise.all(files.map(this.addFileToIndex.bind(this)))).then(() => {
      this.cacheIndex = _.sortBy(this.cacheIndex, 'modificationTime');
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
          const next: Function = () => {
            this.currentCacheSize -= file.size;
            maintain();
          };

          const file: IndexItem = this.cacheIndex.splice(0, 1)[0];
          if (typeof file === 'undefined') return maintain();

          this.file.removeFile(this.cacheDirectory, file.name).then(() => next()).catch(() => next());
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

    const currentItem = this.queue.splice(0, 1)[0];

    if (this.canProcess) this.processQueue();

    const done = () => {
      this.processing--;
      this.processQueue();
    };

    const localPath = this.cacheDirectory + '/' + this.createFileName(currentItem.imageUrl);
    this.downloadImage(currentItem.imageUrl, localPath).then((file: FileEntry) => {
      if (this.shouldIndex) {
        this.addFileToIndex(file).then(this.maintainCacheSize.bind(this));
      }
      this.getCachedImagePath(currentItem.imageUrl).then((localUrl) => {
        currentItem.resolve(localUrl);
        done();
      });
    }).catch((e) => {
      currentItem.reject();
      this.throwError(e);
      done();
    });
  }

  private getCachedImagePath(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.isCacheReady) {
        return reject();
      }

      const fileName = this.createFileName(url);
      this.file.resolveLocalFilesystemUrl(this.cacheDirectory + '/' + fileName).then((fileEntry: FileEntry) => {
        resolve(fileEntry.nativeURL);
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

  private get cacheDirectoryExists(): Promise<boolean> {
    return this.file.checkDir(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName);
  }

  private get cacheRootDirectory(): string {
    return this.platform.is('ios') ? this.file.tempDirectory : this.cacheRootDirectory;
  }

  private get cacheDirectory(): string {
    return this.cacheRootDirectory + this.config.get().imageLoader.cacheDirectoryName;
  }

  private get shouldIndex() {
    return (this.config.get().imageLoader.maxCacheAge > -1) || (this.config.get().imageLoader.maxCacheSize > -1);
  }

  private createCacheDirectory(replace: boolean = false): Promise<any> {
    return this.file.createDir(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName, replace);
  }

  private createFileName(url: string): string {
    return StringUtils.hash(url).toString();
  }
}
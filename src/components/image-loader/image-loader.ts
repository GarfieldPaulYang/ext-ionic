import { Injectable } from '@angular/core';
import { File, FileEntry, Transfer } from 'ionic-native';
import { ImageLoaderConfig } from "./image-loader-config";

declare var cordova: any;

@Injectable()
export class ImageLoaderController {
  private isCacheReady: boolean = false;
  private isInit: boolean = false;

  constructor(private config: ImageLoaderConfig) {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      this.isInit = true;
      this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
    } else {
      document.addEventListener('deviceready', () => {
        this.initCache();
      }, false);
    }
  }

  getImagePath(imageUrl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let getImage = () => {
        this.getCachedImagePath(imageUrl)
          .then(imagePath => {
            resolve(imagePath);
          })
          .catch(() => {
            // image doesn't exist in cache, lets fetch it and save it
            let localPath = cordova.file.cacheDirectory + this.config.cacheDirectoryName + '/' + this.createFileName(imageUrl);
            this.downloadImage(imageUrl, localPath)
              .then(() => {
                resolve(localPath);
              })
              .catch((e) => {
                reject();
                this.throwError(e);
              });
          });
      };

      let check = () => {
        if (this.isInit) {
          if (this.isCacheReady) {
            getImage();
          } else {
            this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
            resolve(imageUrl);
          }
        } else {
          setTimeout(() => check(), 250);
        }
      };
      check();
    });
  }

  private downloadImage(imageUrl: string, localPath: string): Promise<any> {
    let transfer = new Transfer();
    return transfer.download(imageUrl, localPath);
  }

  private initCache(replace?: boolean): void {
    if (!this.filePluginExists) {
      this.isInit = true;
      return;
    }

    this.cacheDirectoryExists.then(() => {
      this.isCacheReady = true;
      this.isInit = true;
    }).catch(() => {
      this.createCacheDirectory(replace).then(() => {
        this.isCacheReady = true;
        this.isInit = true;
      }).catch(e => {
        this.throwError(e);
        this.isInit = true;
      });
    });
  }

  private getCachedImagePath(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.isCacheReady) {
        return reject();
      }

      let fileName = this.createFileName(url);
      let dirPath = cordova.file.cacheDirectory + this.config.cacheDirectoryName;

      File.resolveLocalFilesystemUrl(dirPath + '/' + fileName).then((fileEntry: FileEntry) => {
        resolve(fileEntry.nativeURL);
      }).catch(reject);
    });
  }

  private throwError(error: any): void {
    if (this.config.debugMode) {
      console.error('ImageLoader Error', error);
    }
  }

  private throwWarning(error: any): void {
    if (this.config.debugMode) {
      console.warn('ImageLoader Warning', error);
    }
  }

  private get filePluginExists(): boolean {
    if (!cordova || !cordova.file) {
      this.throwWarning('Unable to find the cordova file plugin. ImageLoader will not cache images.');
      return false;
    }
    return true;
  }

  private get cacheDirectoryExists(): Promise<boolean> {
    return <Promise<boolean>>File.checkDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName);
  }

  private createCacheDirectory(replace: boolean = false): Promise<any> {
    return File.createDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName, replace);
  }

  private createFileName(url: string): string {
    return this.hashString(url).toString();
  }

  private hashString(string: string): number {
    let hash = 0;
    let char;
    if (string.length === 0) return hash;
    for (let i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash;
  }
}
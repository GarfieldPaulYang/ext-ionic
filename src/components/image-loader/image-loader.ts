import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File, FileEntry, Transfer, RemoveResult, FileError } from 'ionic-native';

import { ImageLoaderConfig } from "./image-loader-config";
import { StringUtils } from "../../utils/string";

declare var cordova: any;

@Injectable()
export class ImageLoaderController {
  private isCacheReady: boolean = false;
  private isInit: boolean = false;

  constructor(platform: Platform, private config: ImageLoaderConfig) {
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

      let getImage = () => {
        this.getCachedImagePath(imageUrl).then(imagePath => {
          resolve(imagePath);
        }).catch(() => {
          let localPath = this.cacheDirectory + '/' + this.createFileName(imageUrl);
          this.downloadImage(imageUrl, localPath).then(() => {
            resolve(localPath);
          }).catch(e => {
            reject();
            this.throwError(e);
          });
        });
      };

      let check = () => {
        if (this.isInit) {
          if (this.isCacheReady) {
            getImage();
            return
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
    if (!localPath) {
      return;
    }

    File.removeFile(this.cacheDirectory, localPath.substr(localPath.lastIndexOf('/') + 1)).catch(e => {
      this.throwError(e);
    });
  }

  clearCache(): Promise<RemoveResult | FileError> {
    return File.removeDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName);
  }

  private downloadImage(imageUrl: string, localPath: string): Promise<any> {
    let transfer = new Transfer();
    return transfer.download(imageUrl, localPath);
  }

  private needDownload(imageUrl: string): boolean {
    return StringUtils.startsWith(imageUrl, [
      'http://',
      'https://',
      'ftp://'
    ]);
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
      File.resolveLocalFilesystemUrl(this.cacheDirectory + '/' + fileName).then((fileEntry: FileEntry) => {
        resolve(fileEntry.nativeURL);
      }).catch(reject);
    });
  }

  private throwError(error: any): void {
    console.error('ImageLoader Error', error);
  }

  private throwWarning(error: any): void {
    console.warn('ImageLoader Warning', error);
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

  private get cacheDirectory(): string {
    return cordova.file.cacheDirectory + this.config.cacheDirectoryName;
  }

  private createCacheDirectory(replace: boolean = false): Promise<any> {
    return File.createDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName, replace);
  }

  private createFileName(url: string): string {
    return StringUtils.hash(url).toString();
  }
}
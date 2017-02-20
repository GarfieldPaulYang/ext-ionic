import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from 'ionic-native';
import { isPresent } from '../utils/util';

declare var cordova: any;

@Injectable()
export class JsonStorage {
  private _storageDirectory: string = 'json-storage';
  private map: any = {};

  get storageDirectory(): string {
    return this._storageDirectory;
  }

  set storageDirectory(path: string) {
    this._storageDirectory = path;
  }

  constructor(private platform: Platform) { }

  save(key: string, json: any): Promise<boolean> {
    if (!isPresent(json)) {
      return Promise.resolve(false);
    }
    if (this.platform.is('cordova')) {
      return this.writeJsonToFile(key, json);
    }
    this.map[key] = json;
    return Promise.resolve(true);
  }

  load<T>(key: string): Promise<T> {
    if (this.platform.is('cordova')) {
      return this.readFileToJson(key);
    }
    return Promise.resolve(this.map[key]);
  }

  remove(key: string): Promise<boolean> {
    if (this.platform.is('cordova')) {
      return this.removeFile(key);
    }
    delete this.map[key];
    return Promise.resolve(true);
  }

  private writeJsonToFile(filename: string, json: any): Promise<boolean> {
    return new Promise(resove => {
      File.checkDir(this.getRootpath(), this.storageDirectory).then(_ => {
        resove(true);
      }, _ => {
        resove(File.createDir(this.getRootpath(), this.storageDirectory, true));
      });
    }).then(_ => {
      return File.writeFile(this.getFilepath(), filename, JSON.stringify(json), { replace: true }).then(_ => {
        return true;
      }, e => {
        return false;
      });
    });
  }

  private readFileToJson<T>(key: string): Promise<T> {
    return File.readAsText(this.getFilepath(), key).then((jsonStr: string) => {
      return JSON.parse(jsonStr);
    });
  }

  private removeFile(key: string): Promise<boolean> {
    return File.removeFile(this.getFilepath(), key).then(_ => true);
  }

  /*
    TODO file插件文档中描述ios dataDirectory目录为Library下的NoCloud目录，
    查看ios的介绍中Library目录下默认是没有NoCloud的，需要在ios环境下测试，如果不可用，
    将改为documentsDirectory目录
  */
  private getRootpath(): string {
    return cordova.file.dataDirectory;
  }

  private getFilepath(): string {
    return this.getRootpath() + this.storageDirectory;
  }
}

import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from 'ionic-native';
import { isPresent } from '../utils/util'
declare var cordova: any;

@Injectable()
export class JsonStorage {
  private _rootPath: string = 'json-storage';
  private map: any = {};

  set rootPath(rootPath: string) {
    this._rootPath = rootPath;
  }
  constructor(private platform: Platform) { }

  save(key: string, json: any): Promise<boolean> {
    if (!isPresent(json)) {
      return Promise.resolve(false);
    }
    if (this.platform.is('cordova')) {
      return this.witeJsonToFile(key, json);
    }
    this.map[key] = json;
    return Promise.resolve(true);
  }

  private witeJsonToFile(filename: string, json: any): Promise<boolean> {
    let sysRootPath = cordova.file.dataDirectory;
    return new Promise(resove => {
      File.checkDir(sysRootPath, this._rootPath).then(_ => {
        resove(true);
      }, _ => {
        resove(File.createDir(sysRootPath, this._rootPath, true));
      });
    }).then(_ => {
      let path = sysRootPath + this._rootPath;
      return File.writeFile(path, filename, JSON.stringify(json), { replace: true }).then(_ => {
        return true;
      }, e => {
        console.log(e);
        return false;
      });
    });
  }

  load<T>(key: string): Promise<T> {
    if (this.platform.is('cordova')) {
      return this.readFileToJson(key);
    }
    return this.map[key];
  }

  private readFileToJson<T>(key: string): Promise<T> {
    let path = cordova.file.dataDirectory + this._rootPath;
    return File.readAsText(path, key).then((jsonStr: string) => {
      return JSON.parse(jsonStr);
    }, e => {
      console.log(e);
    });
  }

  remove(key: string): Promise<boolean> {
    if (this.platform.is('cordova')) {
      return this.removeFile(key);
    }
    delete this.map[key];
    return Promise.resolve(true);
  }

  private removeFile(key: string): Promise<boolean> {
    let path = cordova.file.dataDirectory + this._rootPath;
    return File.removeFile(path, key).then(_ => true);
  }
}

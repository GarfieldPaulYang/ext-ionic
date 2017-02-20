import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from 'ionic-native';
import { isPresent } from '../utils/util';

declare var cordova: any;

@Injectable()
export class JsonStorage {
  private map: any = {};

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
    return File.writeFile(this.getFilepath(), filename, JSON.stringify(json), { replace: true }).then(value => {
      return true;
    }, reason => {
      console.log(reason);
      return false;
    });
  }

  private readFileToJson<T>(key: string): Promise<T> {
    return File.readAsText(this.getFilepath(), key).then(value => {
      return JSON.parse(<string>value);
    }, reason => {
      console.log(reason);
      return reason;
    });
  }

  private removeFile(key: string): Promise<boolean> {
    return File.removeFile(this.getFilepath(), key).then(value => {
      return true;
    }, reason => {
      console.log(reason);
      return false;
    });
  }

  /*
    TODO file插件文档中描述ios dataDirectory目录为Library下的NoCloud目录，
    查看ios的介绍中Library目录下默认是没有NoCloud的，需要在ios环境下测试，如果不可用，
    将改为documentsDirectory目录
  */
  private getFilepath(): string {
    return cordova.file.dataDirectory;
  }
}

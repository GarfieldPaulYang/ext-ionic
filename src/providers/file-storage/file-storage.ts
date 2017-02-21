import { FileStorage } from './file-storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from 'ionic-native';
import { isPresent } from '../../utils/util';

declare var cordova: any;

export interface FileStorage {
  save(filename: string, content: any): Promise<boolean>;
  load<T>(filename: string): Promise<T>;
  remove(filename: string): Promise<boolean>;
}

@Injectable()
export class TextFileStorage implements FileStorage {
  private localStorage: any = {};

  constructor(protected platform: Platform) { }

  save(filename: string, content: any): Promise<boolean> {
    if (!isPresent(content)) {
      return Promise.resolve(false);
    }
    if (this.platform.is('cordova')) {
      return this.writeToFile(filename, content);
    }
    this.localStorage[filename] = content;
    return Promise.resolve(true);
  }

  load<T>(filename: string): Promise<T> {
    if (this.platform.is('cordova')) {
      return this.readFile(filename);
    }
    return Promise.resolve(this.localStorage[filename]);
  }

  remove(filename: string): Promise<boolean> {
    if (this.platform.is('cordova')) {
      return this.removeFile(filename);
    }
    delete this.localStorage[filename];
    return Promise.resolve(true);
  }

  protected serialize(content: any): string {
    return content;
  }

  protected deserialize(content: string): any {
    return content;
  }

  private writeToFile(filename: string, content: any): Promise<boolean> {
    return File.writeFile(this.getFilepath(), filename, this.serialize(content), { replace: true }).then(value => {
      return true;
    }, reason => {
      console.log(reason);
      return false;
    });
  }

  private readFile<T>(filename: string): Promise<T> {
    return File.readAsText(this.getFilepath(), filename).then(value => {
      return this.deserialize(<string>value);
    }, reason => {
      console.log(reason);
      return reason;
    });
  }

  private removeFile(filename: string): Promise<boolean> {
    return File.removeFile(this.getFilepath(), filename).then(value => {
      return true;
    }, reason => {
      console.log(reason);
      return false;
    });
  }

  private getFilepath(): string {
    return cordova.file.dataDirectory;
  }
}
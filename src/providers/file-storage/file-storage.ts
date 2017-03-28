import { FileStorage } from './file-storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File, RemoveResult } from '@ionic-native/file';
import { isPresent } from '../../utils/util';

declare var cordova: any;

export interface FileStorage {
  save(filename: string, content: any): Promise<any>;
  load<T>(filename: string): Promise<T>;
  remove(filename: string): Promise<RemoveResult>;
}

@Injectable()
export class TextFileStorage implements FileStorage {
  private localStorage: any = {};

  constructor(protected platform: Platform, protected file: File) { }

  save(filename: string, content: any): Promise<void> {
    if (!isPresent(content)) {
      return Promise.reject('content is not present');
    }
    if (this.platform.is('cordova')) {
      return this.writeToFile(filename, content);
    }
    this.localStorage[filename] = content;
    return Promise.resolve();
  }

  load<T>(filename: string): Promise<T> {
    if (this.platform.is('cordova')) {
      return this.readFile(filename);
    }

    let content = this.localStorage[filename];
    if (!content) {
      return Promise.reject('file not found.');
    }

    return Promise.resolve(content);
  }

  remove(filename: string): Promise<RemoveResult> {
    if (this.platform.is('cordova')) {
      return this.removeFile(filename);
    }
    delete this.localStorage[filename];
    return Promise.resolve({ success: true });
  }

  protected serialize(content: any): string {
    return content;
  }

  protected deserialize(content: string): any {
    return content;
  }

  private writeToFile(filename: string, content: any): Promise<any> {
    return this.file.writeFile(this.getFilepath(), filename, this.serialize(content), { replace: true }).then(value => {
      return value;
    }).catch(reason => {
      console.log(reason);
      return Promise.reject(reason);
    });
  }

  private readFile<T>(filename: string): Promise<T> {
    return this.file.readAsText(this.getFilepath(), filename).then(value => {
      return this.deserialize(<string>value);
    }).catch(reason => {
      console.log(reason);
      return Promise.reject(reason);
    });
  }

  private removeFile(filename: string): Promise<RemoveResult> {
    return this.file.removeFile(this.getFilepath(), filename).then(value => {
      return value;
    }).catch(reason => {
      console.log(reason);
      return Promise.reject(reason);
    });
  }

  private getFilepath(): string {
    return cordova.file.dataDirectory;
  }
}
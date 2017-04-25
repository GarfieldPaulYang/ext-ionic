import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { isPresent } from '../../utils/util';
import { Storage } from './storage';
import { MemoryStorage } from './mem-storage';

@Injectable()
export class TextFileStorage implements Storage {
  constructor(protected platform: Platform, protected file: File, protected memoryStorage: MemoryStorage) { }

  save(filename: string, content: any): Promise<any> {
    if (!isPresent(content)) {
      return Promise.reject('content is not present');
    }
    if (this.platform.is('cordova')) {
      return this.writeToFile(filename, content);
    }
    return this.memoryStorage.save(filename, content);
  }

  load<T>(filename: string): Promise<T> {
    if (this.platform.is('cordova')) {
      return this.readFile<T>(filename);
    }

    return this.memoryStorage.load<T>(filename);
  }

  remove(filename: string): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.removeFile(filename);
    }
    return this.memoryStorage.remove(filename);
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
      return Promise.reject(reason);
    });
  }

  private readFile<T>(filename: string): Promise<T> {
    return this.file.readAsText(this.getFilepath(), filename).then(value => {
      return this.deserialize(<string>value);
    }).catch(reason => {
      return Promise.reject(reason);
    });
  }

  private removeFile(filename: string): Promise<any> {
    return this.file.removeFile(this.getFilepath(), filename).then(value => {
      return value;
    }).catch(reason => {
      return Promise.reject(reason);
    });
  }

  private getFilepath(): string {
    return this.file.dataDirectory;
  }
}
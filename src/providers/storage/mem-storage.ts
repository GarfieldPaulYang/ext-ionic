import { Injectable } from '@angular/core';
import { Storage } from './storage';
import { isPresent } from '../../utils/util';

@Injectable()
export class MemoryStorage implements Storage {
  private localStorage: any = {};

  save(filename: string, content: any): Promise<any> {
    if (!isPresent(content)) {
      return Promise.reject('content is not present');
    }
    this.localStorage[filename] = content;
    return Promise.resolve();
  }

  load<T>(filename: string): Promise<T> {
    let content = this.localStorage[filename];
    if (!content) {
      return Promise.reject('file not found.');
    }
    return Promise.resolve(content);
  }

  remove(filename: string): Promise<any> {
    delete this.localStorage[filename];
    return Promise.resolve<any>({ success: true });
  }
}
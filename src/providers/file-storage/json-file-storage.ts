import { TextFileStorage } from './file-storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class JsonFileStorage extends TextFileStorage {
  constructor(public platform: Platform) {
    super(platform);
  }

  protected serialize(content: any): string {
    return JSON.stringify(content);
  }

  protected deserialize(content: string): any {
    return JSON.parse(content);
  }
}

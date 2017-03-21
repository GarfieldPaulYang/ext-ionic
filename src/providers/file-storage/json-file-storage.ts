import { TextFileStorage } from './file-storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Injectable()
export class JsonFileStorage extends TextFileStorage {
  constructor(public platform: Platform, public file: File) {
    super(platform, file);
  }

  protected serialize(content: any): string {
    return JSON.stringify(content);
  }

  protected deserialize(content: string): any {
    return JSON.parse(content);
  }
}

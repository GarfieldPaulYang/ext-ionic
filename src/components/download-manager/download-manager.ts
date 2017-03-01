
import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Transfer } from 'ionic-native';
import { ExtLocalNotifications } from '../../native/local-notifications';
import { DownloadProgress } from './download-manager-component';

declare var cordova: any;

export interface DownloadOptions {
  url: string;
  filePath: string;
  fileName: string;
}

export const download_start: string = 'download_start';

export const download_progress: string = 'download_progress';

export const download_end: string = 'download_end';

@Injectable()
export class DownloadManagerController {
  downloadDirectory;

  constructor(private platform: Platform,
    private events: Events) {
    if (platform.is('cordova')) {
      let rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
      this.downloadDirectory = rootPath + 'download';
    }
  }

  download(option: DownloadOptions): Promise<any> {
    let hasNtFcns = false;
    let transfer = this.createTransfer(hasNtFcns, option.fileName);
    let filePath = this.downloadDirectory + option.filePath + '/' + option.fileName;
    return transfer.download(option.url, filePath).then(entry => {
      if (hasNtFcns) {
        ExtLocalNotifications.clear(1000);
      }
      this.events.publish(download_end, option);
    });
  }

  private createTransfer(hasNtFcns: boolean, fileName: string): Transfer {
    let transfer = new Transfer();
    let hasFirst = true;
    transfer.onProgress(event => {
      if (hasFirst) {
        this.events.publish(download_start, fileName);
        hasNtFcns = event.total > (1024 * 1024 * 5);
        ExtLocalNotifications.schedule({
          id: 1000,
          title: '开始下载...',
          progress: this.platform.is('android'),
          maxProgress: 100,
          currentProgress: 0
        });
      }
      hasFirst = false;
      let progress = Math.round((event.loaded / event.total) * 100);
      if (!hasFirst && hasNtFcns) {
        ExtLocalNotifications.update({
          id: 1000,
          title: '下载中...',
          progress: this.platform.is('android'),
          maxProgress: 100,
          currentProgress: progress,
          sound: null
        });
      }
      let param: DownloadProgress = { fileName: fileName, progress: progress };
      this.events.publish(download_progress, param);
    });
    return transfer;
  }
}
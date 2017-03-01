
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer } from 'ionic-native';
import * as _ from 'lodash';
import { ExtLocalNotifications } from '../../native/local-notifications';
import { isPresent } from '../../utils/util';

declare var cordova: any;

export interface FileInfo {
  fileName: string;
  filePath: string;
}

export interface DownloadOptions {
  fileName: string;
  filePath?: string;
  url: string;
}

export interface DownloadInfo extends FileInfo {
  progress: number;
}

interface TransferOptions extends FileInfo {
  hasNtFcns: boolean;
}

@Injectable()
export class DownloadManagerController {
  lownloadList: Array<DownloadInfo> = [];

  private downloadDirectory;

  constructor(private platform: Platform) {
    if (platform.is('cordova')) {
      let rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
      this.downloadDirectory = rootPath + 'download/';
    }
  }

  download(option: DownloadOptions): Promise<any> {
    if (!isPresent(option.filePath)) {
      option.filePath = '';
    }
    let filePath = this.downloadDirectory + option.filePath;
    let opt: TransferOptions = { hasNtFcns: false, fileName: option.fileName, filePath: filePath };
    let transfer = this.createTransfer(opt);
    return transfer.download(option.url, filePath + option.fileName).then(entry => {
      if (opt.hasNtFcns) {
        ExtLocalNotifications.clear(1000);
      }
    });
  }

  private createTransfer(opt: TransferOptions): Transfer {
    let transfer = new Transfer();
    let hasFirst = true;
    transfer.onProgress(event => {
      if (hasFirst) {
        opt.hasNtFcns = event.total > (1024 * 1024 * 5);
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
      if (!hasFirst && opt.hasNtFcns) {
        ExtLocalNotifications.update({
          id: 1000,
          title: '下载中...',
          progress: this.platform.is('android'),
          maxProgress: 100,
          currentProgress: progress,
          sound: null
        });
      }
      let file = _.find(this.lownloadList, { fileName: opt.fileName });
      if (!isPresent(file)) {
        this.lownloadList.push({ fileName: opt.fileName, filePath: opt.filePath, progress: progress });
        return;
      }
      file.progress = progress;
    });
    return transfer;
  }
}

import { Injectable, ChangeDetectorRef } from '@angular/core';
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
  notification: boolean;
  notificationId: number;
}

export interface DownloadManagerInfo {
  downloadList: Array<DownloadInfo>;
  downloadHistory: Array<DownloadInfo>;
}

@Injectable()
export class DownloadManagerController {
  pageChangeDetetorRef: ChangeDetectorRef;
  private _managerInfo: DownloadManagerInfo;

  get managerInfo(): DownloadManagerInfo {
    return this._managerInfo;
  }

  private downloadDirectory;

  constructor(private platform: Platform) {
    this._managerInfo = { downloadList: [], downloadHistory: [] };
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
    let opt: TransferOptions = { notificationId: 0, notification: false, fileName: option.fileName, filePath: filePath };
    let file = _.find(this._managerInfo.downloadList, { fileName: opt.fileName });
    if (isPresent(file)) {
      file.progress = 0;
    } else {
      file = { fileName: opt.fileName, filePath: opt.filePath, progress: 0 };
      this._managerInfo.downloadList.push(file);
    }
    let transfer = this.createTransfer(opt, file);
    return transfer.download(option.url, filePath + option.fileName).then(entry => {
      if (opt.notification) {
        ExtLocalNotifications.clear(opt.notificationId);
      }
    }).catch(e => {
      console.log(e);
    });
  }

  private createTransfer(opt: TransferOptions, file: DownloadInfo): Transfer {
    let transfer = new Transfer();
    let first = true;
    transfer.onProgress(event => {
      if (first) {
        first = false;
        opt.notification = event.total > (1024 * 1024 * 5);
        if (opt.notification) {
          opt.notificationId = this.createNotifications();
        }
      }
      let progress = Math.round((event.loaded / event.total) * 100);
      if (progress > file.progress) {
        console.log(progress);
        file.progress = progress;
        if (isPresent(this.pageChangeDetetorRef)) {
          this.pageChangeDetetorRef.detectChanges();
        }
        if (!first && opt.notification) {
          this.updateLocalNotifications(opt.notificationId, progress);
        }
      }
    });
    return transfer;
  }

  private createNotifications(): number {
    let num: number = Math.round((Math.random() * 1000));
    ExtLocalNotifications.schedule({
      id: num,
      title: '开始下载...',
      progress: this.platform.is('android'),
      maxProgress: 100,
      currentProgress: 0
    });
    return num;
  }

  private updateLocalNotifications(id: number, progress: number) {
    ExtLocalNotifications.update({
      id: id,
      title: '下载中...',
      progress: this.platform.is('android'),
      maxProgress: 100,
      currentProgress: progress,
      sound: null
    });
  }
}
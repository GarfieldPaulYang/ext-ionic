
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Transfer } from 'ionic-native';
import { ExtLocalNotifications } from '../../native/local-notifications';
import { isPresent } from '../../utils/util';
import { DownloadManagerCmp } from './download-manager-component';

declare var cordova: any;

export interface DownloadOptions {
  fileName: string;
  filePath?: string;
  url: string;
}

export interface DownloadEvent {
  fileName: string;
  filePath: string;
  progress: number;
}

@Injectable()
export class DownloadManagerController {
  private _event: EventEmitter<DownloadEvent> = new EventEmitter<DownloadEvent>(true);
  private id: number = 999;
  private _fileSystemRoot: string;
  private _rootDirectory: string = 'download/';

  get event() {
    return this._event;
  }

  get downloadDirectory() {
    return this._fileSystemRoot + this._rootDirectory;
  }

  constructor(private platform: Platform,
    private ngZone: NgZone) {
    if (platform.is('cordova')) {
      this._fileSystemRoot = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
    }
  }

  show(navCtrl: NavController) {
    navCtrl.push(DownloadManagerCmp);
  }

  download(option: DownloadOptions): Promise<any> {
    if (!isPresent(option.filePath)) {
      option.filePath = '';
    }
    let filePath = this.downloadDirectory + option.filePath;
    let notificationId: number;
    let notification: boolean = false;
    let first = true;
    let downloadProgress: number = 0;
    let transfer = new Transfer();
    transfer.onProgress(event => {
      if (first) {
        first = false;
        notification = event.total > (1024 * 1024 * 5);
        if (notification) {
          this.createNotification(option.fileName).then(id => {
            notificationId = id;
          });
        }
        return;
      }
      let progress = Math.round((event.loaded / event.total) * 100);
      if (progress > downloadProgress) {
        downloadProgress = progress;
        if (notification && notificationId) {
          this.updateLocalNotification(option.fileName, notificationId, progress);
        }
        this.ngZone.run(() => {
          this._event.emit({
            progress: progress,
            fileName: option.fileName,
            filePath: filePath
          });
        });
      }
    });
    let target = filePath + option.fileName;
    if (this.platform.is('ios')) {
      target = encodeURI(target);
    }
    return transfer.download(encodeURI(option.url), target).then(entry => {
      if (notification && notificationId) {
        ExtLocalNotifications.clear(notificationId);
      }
      return entry;
    });
  }

  private createId(): Promise<number> {
    this.id++;
    return ExtLocalNotifications.isScheduled(this.id).then(isScheduled => {
      if (isScheduled) {
        return this.createId();
      };
      return this.id;
    });
  }

  private createNotification(fileName: string): Promise<number> {
    return this.createId().then(id => {
      ExtLocalNotifications.schedule({
        id: id,
        title: fileName + ' 开始下载...',
        progress: this.platform.is('android'),
        maxProgress: 100,
        currentProgress: 0
      });
      return id;
    });
  }

  private updateLocalNotification(fileName: string, id: number, progress: number) {
    ExtLocalNotifications.update({
      id: id,
      title: fileName + '下载中...',
      progress: this.platform.is('android'),
      maxProgress: 100,
      currentProgress: progress,
      sound: null
    });
  }
}
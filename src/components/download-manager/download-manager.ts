
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ExtLocalNotifications } from '../../native/local-notifications';
import { guid, isPresent } from '../../utils/util';
import { DownloadManagerCmp } from './download-manager-component';

export interface DownloadOptions {
  fileName?: string;
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

  constructor(
    private platform: Platform,
    private transfer: FileTransfer,
    private file: File,
    private localNotifications: ExtLocalNotifications,
    private ngZone: NgZone
  ) {
    if (platform.is('cordova')) {
      this._fileSystemRoot = this.platform.is('android') ? this.file.externalApplicationStorageDirectory : this.file.documentsDirectory;
    }
  }

  show(navCtrl: NavController) {
    navCtrl.push(DownloadManagerCmp);
  }

  download(option: DownloadOptions): Promise<any> {
    if (!option.fileName) {
      option.fileName = guid();
    }
    if (!isPresent(option.filePath)) {
      option.filePath = '';
    }
    const filePath = this.downloadDirectory + option.filePath;
    let notificationId: number;
    let notification: boolean = false;
    let first = true;
    let downloadProgress: number = 0;
    const transfer = this.transfer.create();
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
      const progress = Math.round((event.loaded / event.total) * 100);
      if (progress > downloadProgress) {
        downloadProgress = progress;
        if (notification && notificationId) {
          this.updateLocalNotification(option.fileName, notificationId, progress);
        }
        this.ngZone.run(() => {
          this._event.emit({
            progress,
            fileName: option.fileName,
            filePath
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
        this.localNotifications.clear(notificationId);
      }
      return entry;
    });
  }

  private createId(): Promise<number> {
    this.id++;
    return this.localNotifications.isScheduled(this.id).then(isScheduled => {
      if (isScheduled) {
        return this.createId();
      }
      return this.id;
    });
  }

  private createNotification(fileName: string): Promise<number> {
    return this.createId().then(id => {
      this.localNotifications.schedule({
        id,
        title: fileName + ' 开始下载...',
        progressBar: { enabled: this.platform.is('android'), maxValue: 100, value: 0 }
      });
      return id;
    });
  }

  private updateLocalNotification(fileName: string, id: number, progress: number) {
    this.localNotifications.update({
      id,
      title: fileName + '下载中...',
      sound: null,
      progressBar: { enabled: this.platform.is('android'), maxValue: 100, value: progress }
    });
  }
}
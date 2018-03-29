import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ErrorCode, HotCodePush } from '@ionic-native/hot-code-push';

import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ExtLocalNotifications } from '../native/local-notifications';

@Injectable()
export class HotUpdater {
  constructor(
    private platform: Platform,
    private dialog: Dialog,
    private config: ConfigProvider,
    private hotCodePush: HotCodePush,
    private localNotifications: ExtLocalNotifications,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener
  ) { }

  start() {
    this.hotCodePush.isUpdateAvailableForInstallation().then(() => {
      this.hotCodePush.installUpdate().catch((error) => {
        console.log(error);
      });
    }, () => {
      this.hotCodePush.fetchUpdate().then(() => {
        this.dialog.confirm('更新通知', '新版本更新成功,是否现在重启应用?', () => {
          this.hotCodePush.installUpdate().catch((error) => {
            console.log(error);
          });
        });
      }, (error) => {
        if (error.code === ErrorCode.APPLICATION_BUILD_VERSION_TOO_LOW) {
          this.updateApp();
          return;
        }
        console.log(error);
      });
    });
  }

  updateApp() {
    if (!this.config.get().hotUpdateUrl) {
      return;
    }
    this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
      if (this.platform.is('ios')) {
        this.updateIos();
        return;
      }
      this.updateAndroid();
    });
  }

  updateIos() {
    this.dialog.alert('更新通知', '程序有新版本发布，请卸载当前应用，扫码二维码重新安装本应用。');
  }

  updateAndroid() {
    const targetPath = this.file.externalApplicationStorageDirectory + '/app/app.apk';
    this.localNotifications.schedule({
      id: 1000,
      title: '正在更新...',
      progressBar: { enabled: true, maxValue: 100, value: 0 }
    });
    const transfer = this.transfer.create();
    transfer.onProgress(event => {
      const progress = ((event.loaded / event.total) * 100).toFixed(2);
      this.localNotifications.update({
        id: 1000,
        title: '正在更新...',
        sound: null,
        progressBar: { enabled: true, maxValue: 100, value: Math.round(Number(progress)) }
      });
    });
    transfer.download(this.config.get().hotUpdateUrl.android, targetPath).then(() => {
      this.localNotifications.clear(1000);
      this.dialog.confirm('更新通知', '新版本下载完成是否现在安装?', () => {
        this.fileOpener.open(targetPath, 'application/vnd.android.package-archive');
      });
    }, e => {
      console.log(e);
    });
  }
}
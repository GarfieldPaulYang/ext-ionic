import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';

import { HotCodePush } from '../native/hot-code-push';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ExtLocalNotifications } from '../native/local-notifications';
import { OpenUrlModalController } from '../components/open-url-modal/open-url-modal';

declare var cordova: any;

@Injectable()
export class HotUpdater {
  constructor(
    private platform: Platform,
    private dialog: Dialog,
    private config: ConfigProvider,
    private openUrlCtrl: OpenUrlModalController
  ) { }

  start() {
    HotCodePush.isUpdateAvailableForInstallation((error, data) => {
      if (!error) {
        HotCodePush.installUpdate().then(error => {
          console.log(error);
        });
        return;
      }
      HotCodePush.fetchUpdate((error, data) => {
        if (!error) {
          this.dialog.confirm('更新通知', '新版本更新成功,是否现在重启应用?', () => {
            HotCodePush.installUpdate().then(e => {
              console.log(e);
            });
          });
          return;
        }
        if (error.code === HotCodePush.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
          this.updateApp();
          return;
        }
        console.log(error);
      }, {});
    });
  }

  updateApp() {
    if (!this.config.get().hotUpdateUrl) {
      return;
    }
    let isios = this.platform.is('ios');
    if (isios) {
      this.updateIos();
      return;
    }
    let isAndroid = this.platform.is('android');
    if (isAndroid) {
      this.updateAndroid();
    }
  }

  updateIos() {
    this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
      this.openUrlCtrl.open({
        title: '应用更新',
        url: this.config.get().hotUpdateUrl.ios
      });
    });
  }

  updateAndroid() {
    var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
    this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
      ExtLocalNotifications.schedule({
        id: 1000,
        title: '正在更新...',
        progress: true,
        maxProgress: 100,
        currentProgress: 0
      });
      let transfer = new Transfer();
      transfer.onProgress(event => {
        let progress = ((event.loaded / event.total) * 100).toFixed(2);
        ExtLocalNotifications.update({
          id: 1000,
          title: '正在更新...',
          progress: true,
          maxProgress: 100,
          currentProgress: Math.round(Number(progress))
        });
      });
      transfer.download(this.config.get().hotUpdateUrl.android, targetPath).then(() => {
        ExtLocalNotifications.clear(1000);
        this.dialog.confirm('更新通知', '新版本下载完成是否现在安装?', () => {
          FileOpener.open(targetPath, 'application/vnd.android.package-archive');
        });
      }, e => {
        console.log(e);
      });
    });
  }
}
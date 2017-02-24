import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';

import { ExtLocalNotifications } from '../native/local-notifications';
import { HotCodePush } from '../native/hot-code-push';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';

declare var cordova: any;

interface ResultMsg {
  code: number;
  description: string;
}

@Injectable()
export class HotUpdater {
  constructor(
    private platform: Platform,
    private dialog: Dialog,
    private config: ConfigProvider
  ) { }

  start() {
    console.log('start');
    HotCodePush.fetchUpdate().then((result: ResultMsg) => {
      if (result == null) {
        this.dialog.confirm('更新通知', '新版本更新成功,是否现在重启应用?', () => {
          HotCodePush.installUpdate().then(e => {
            console.log(e);
          }, e => {
            console.log(e);
          });
        });
        return true;
      }
      if (result.code === HotCodePush.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
        this.updateApp();
      }
      console.log(result);
    }).catch(e => {
      console.log(e);
    });
  }

  updateApp() {
    let isAndroid = this.platform.is('android');
    if (!isAndroid) {
      return;
    }
    if (!this.config.get().hotUpdateUrl) {
      return;
    }
    var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
    this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
      let transfer = new Transfer();
      transfer.download(this.config.get().hotUpdateUrl, targetPath).then(() => {
        ExtLocalNotifications.clear(1000);
        FileOpener.open(targetPath, 'application/vnd.android.package-archive');
      }, e => {
        console.log(e);
      });
    });
  }
}
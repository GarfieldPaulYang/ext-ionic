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
    var targetPath = cordova.file.externalRootDirectory + '/app/app.apk';
    this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
      ExtLocalNotifications.schedule({
        id: 1000,
        title: '正在更新...',
        text: isAndroid ? '' : '已经完成 0%',
        progress: isAndroid,
        maxProgress: 100,
        currentProgress: 0
      });
      let transfer = new Transfer();
      transfer.onProgress(event => {
        let progress = ((event.loaded / event.total) * 100).toFixed(2);
        ExtLocalNotifications.update({
          id: 1000,
          title: '正在更新...',
          text: isAndroid ? '' : `已经完成 ${progress}%`,
          progress: isAndroid,
          maxProgress: 100,
          currentProgress: Number(progress)
        });
      });
      console.log('download');
      console.log(this.config.get().hotUpdateUrl);
      transfer.download(this.config.get().hotUpdateUrl, targetPath).then(() => {
        console.log('downloadend');
        ExtLocalNotifications.clear(1000);
        //        FileOpener.open(targetPath, 'application/vnd.android.package-archive');
      }, e => {
        console.log(e);
      });
    });
  }
}
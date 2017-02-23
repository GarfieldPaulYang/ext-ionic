import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';

import { ExtLocalNotifications } from '../native/local-notifications';
import { HotCodePush } from '../native/hot-code-push';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';

declare var cordova: any;

@Injectable()
export class HotUpdater {
  constructor(
    private platform: Platform,
    private dialog: Dialog,
    private config: ConfigProvider
  ) { }

  start() {
    if (!this.config.get().hotUpdateUrl) {
      return;
    }

    HotCodePush.onUpdateInstalled(event => {
      this.dialog.toast('程序已更新完成，重启后生效...');
    });

    HotCodePush.onAppNeedUpdate().then(() => {
      let isAndroid = this.platform.is('android');
      if (!isAndroid) {
        return;
      }

      var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
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
        transfer.download(this.config.get().hotUpdateUrl, targetPath).then(() => {
          ExtLocalNotifications.clear(1000);
          FileOpener.open(targetPath, 'application/vnd.android.package-archive');
        });
      });
    });
  }
}
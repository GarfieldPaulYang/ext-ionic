import { Injectable } from '@angular/core';
import { Platform, Loading, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class Dialog {
  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  alert(title: string, message: string): void {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['确定']
    });
    alert.present();
  }

  confirm(title: string, message: string, handler: Function) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: '取消',
        role: 'cancel'
      }, {
        text: '确定',
        handler: handler
      }]
    });
    alert.present();
  }

  loading(content: string): Loading {
    return this.loadingCtrl.create({
      content: content
    });
  }
}
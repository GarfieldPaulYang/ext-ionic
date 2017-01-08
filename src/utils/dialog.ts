import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class Dialog {
  constructor(
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

  loading(content: string): Loading {
    return this.loadingCtrl.create({
      content: content
    });
  }
}
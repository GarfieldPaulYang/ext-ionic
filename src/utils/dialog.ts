import { Injectable } from '@angular/core';
import { AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class Dialog {
  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  alert(title: string, message: string): void {
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: ['确定']
    });
    alert.present();
  }

  confirm(title: string, message: string, handler: (value: any) => boolean | void) {
    const alert = this.alertCtrl.create({
      title,
      message,
      buttons: [{
        text: '取消',
        role: 'cancel'
        // tslint:disable-next-line:align
      }, {
        text: '确定',
        handler
      }]
    });
    alert.present();
  }

  loading(content: string): Loading {
    return this.loadingCtrl.create({
      content
    });
  }

  toast(message: string, position: string = 'top') {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position
    });
    toast.present();
  }
}
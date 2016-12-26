import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, ViewController } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

import { OpenUrlModalOptions } from './open-url-modal-options';
import { OpenUrlModalCmp } from './open-url-modal-component';

@Injectable()
export class OpenUrlModalController {
  private options: OpenUrlModalOptions = {};

  constructor(private modalCtrl: ModalController, private viewCtrl: ViewController) { }

  open(opts: OpenUrlModalOptions = {}, modalOpts: ModalOptions = {}) {
    this.options = opts;
    this.options.color = isPresent(this.options.color) ? this.options.color : 'light';
    this.options.onmessage = isPresent(this.options.onmessage) ? this.options.onmessage : (e) => { };

    let modal = this.modalCtrl.create(OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
    modal.onDidDismiss(data => {
      window.removeEventListener('message', data.onmessage, false);
    });
    modal.present();
  }

  close() {
    this.viewCtrl.dismiss(this.options);
  }
}


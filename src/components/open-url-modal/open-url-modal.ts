import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, Modal } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';

import { OpenUrlModalOptions } from './open-url-modal-options';
import { OpenUrlModalCmp } from './open-url-modal-component';

@Injectable()
export class OpenUrlModalController {
  private options: OpenUrlModalOptions = {};
  private modal: Modal;

  constructor(private modalCtrl: ModalController) { }

  open(opts: OpenUrlModalOptions = {}, modalOpts: ModalOptions = {}) {
    this.options = opts;
    this.options.color = isPresent(this.options.color) ? this.options.color : 'light';
    this.options.onmessage = isPresent(this.options.onmessage) ? this.options.onmessage : (e) => { };

    this.modal = this.modalCtrl.create(OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
    this.modal.onDidDismiss(data => {
      window.removeEventListener('message', data.onmessage, false);
    });
    this.modal.present();
  }

  close() {
    this.modal.dismiss(this.options);
  }
}


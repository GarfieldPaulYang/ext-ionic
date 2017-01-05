import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, Modal } from 'ionic-angular';
import { assign } from 'ionic-angular/util/util';

import { ConfigManager } from '../../config/config';

import { OpenUrlModalOptions } from './open-url-modal-options';
import { OpenUrlModalCmp } from './open-url-modal-component';

@Injectable()
export class OpenUrlModalController {
  private options: OpenUrlModalOptions = {};
  private modal: Modal;

  constructor(private modalCtrl: ModalController, private config: ConfigManager) { }

  open(opts: OpenUrlModalOptions = {}, modalOpts: ModalOptions = {}) {
    this.options = assign({}, this.config.openUrlModalOptions, opts);

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


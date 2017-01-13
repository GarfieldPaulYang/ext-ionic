import { Injectable, Inject } from '@angular/core';
import { ModalController, ModalOptions, Modal } from 'ionic-angular';
import { assign } from 'lodash';

import { WHCYIT_IONIC_CONFIG, Config } from '../../config/config';

import { OpenUrlModalOptions } from './open-url-modal-options';
import { OpenUrlModalCmp } from './open-url-modal-component';

@Injectable()
export class OpenUrlModalController {
  private options: OpenUrlModalOptions = {};
  private modal: Modal;

  constructor(private modalCtrl: ModalController, @Inject(WHCYIT_IONIC_CONFIG) private config: Config) { }

  open(opts: OpenUrlModalOptions = {}, modalOpts: ModalOptions = {}) {
    this.options = assign({}, this.config.openUrlModal, opts);

    this.modal = this.modalCtrl.create(OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
    this.modal.onDidDismiss((data: any) => {
      window.removeEventListener('message', data.onmessage, false);
    });
    this.modal.present();
  }

  close() {
    this.modal.dismiss(this.options);
  }
}


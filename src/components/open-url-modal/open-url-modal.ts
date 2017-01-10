import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, Modal } from 'ionic-angular';
import * as _ from 'lodash';

import { ConfigManager } from '../../config/config';

import { OpenUrlModalOptions } from './open-url-modal-options';
import { OpenUrlModalCmp } from './open-url-modal-component';

@Injectable()
export class OpenUrlModalController {
  private options: OpenUrlModalOptions = {};
  private modal: Modal;

  constructor(private modalCtrl: ModalController, private config: ConfigManager) { }

  open(opts: OpenUrlModalOptions = {}, modalOpts: ModalOptions = {}) {
    this.options = _.assign({}, this.config.openUrlModal, opts);

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


import { Injectable, Inject } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { assign } from 'lodash';
import { WHCYIT_IONIC_CONFIG } from '../../config/config';
import { OpenUrlModalCmp } from './open-url-modal-component';
export var OpenUrlModalController = (function () {
    function OpenUrlModalController(modalCtrl, config) {
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.options = {};
    }
    OpenUrlModalController.prototype.open = function (opts, modalOpts) {
        if (opts === void 0) { opts = {}; }
        if (modalOpts === void 0) { modalOpts = {}; }
        this.options = assign({}, this.config.openUrlModal, opts);
        this.modal = this.modalCtrl.create(OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
        this.modal.onDidDismiss(function (data) {
            window.removeEventListener('message', data.onmessage, false);
        });
        this.modal.present();
    };
    OpenUrlModalController.prototype.close = function () {
        this.modal.dismiss(this.options);
    };
    OpenUrlModalController.decorators = [
        { type: Injectable },
    ];
    OpenUrlModalController.ctorParameters = [
        { type: ModalController, },
        { type: undefined, decorators: [{ type: Inject, args: [WHCYIT_IONIC_CONFIG,] },] },
    ];
    return OpenUrlModalController;
}());
//# sourceMappingURL=open-url-modal.js.map
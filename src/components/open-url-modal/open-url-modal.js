var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ConfigProvider } from '../../config/config';
import { OpenUrlModalCmp } from './open-url-modal-component';
var OpenUrlModalController = (function () {
    function OpenUrlModalController(modalCtrl, config) {
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.options = {};
    }
    OpenUrlModalController.prototype.open = function (opts, modalOpts) {
        if (opts === void 0) { opts = {}; }
        if (modalOpts === void 0) { modalOpts = {}; }
        this.options = __assign({}, this.config.get().openUrlModal, opts);
        this.modal = this.modalCtrl.create(OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
        this.modal.onDidDismiss(function (data) {
            window.removeEventListener('message', data.onmessage, false);
        });
        this.modal.present();
    };
    OpenUrlModalController.prototype.close = function () {
        this.modal.dismiss(this.options).catch(function () { });
    };
    return OpenUrlModalController;
}());
export { OpenUrlModalController };
OpenUrlModalController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OpenUrlModalController.ctorParameters = function () { return [
    { type: ModalController, },
    { type: ConfigProvider, },
]; };
//# sourceMappingURL=open-url-modal.js.map
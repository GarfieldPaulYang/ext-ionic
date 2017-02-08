"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var _ = require('lodash');
var config_1 = require('../../config/config');
var open_url_modal_component_1 = require('./open-url-modal-component');
var OpenUrlModalController = (function () {
    function OpenUrlModalController(modalCtrl, config) {
        this.modalCtrl = modalCtrl;
        this.config = config;
        this.options = {};
    }
    OpenUrlModalController.prototype.open = function (opts, modalOpts) {
        if (opts === void 0) { opts = {}; }
        if (modalOpts === void 0) { modalOpts = {}; }
        this.options = _.assign({}, this.config.openUrlModal, opts);
        this.modal = this.modalCtrl.create(open_url_modal_component_1.OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
        this.modal.onDidDismiss(function (data) {
            window.removeEventListener('message', data.onmessage, false);
        });
        this.modal.present();
    };
    OpenUrlModalController.prototype.close = function () {
        this.modal.dismiss(this.options);
    };
    OpenUrlModalController.decorators = [
        { type: core_1.Injectable },
    ];
    OpenUrlModalController.ctorParameters = [
        { type: ionic_angular_1.ModalController, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [config_1.EXT_IONIC_CONFIG,] },] },
    ];
    return OpenUrlModalController;
}());
exports.OpenUrlModalController = OpenUrlModalController;
//# sourceMappingURL=open-url-modal.js.map
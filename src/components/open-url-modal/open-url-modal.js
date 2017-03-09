"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
        this.options = _.assign({}, this.config.get().openUrlModal, opts);
        this.modal = this.modalCtrl.create(open_url_modal_component_1.OpenUrlModalCmp, { openUrlModalOptions: opts }, modalOpts);
        this.modal.onDidDismiss(function (data) {
            window.removeEventListener('message', data.onmessage, false);
        });
        this.modal.present();
    };
    OpenUrlModalController.prototype.close = function () {
        this.modal.dismiss(this.options);
    };
    OpenUrlModalController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.ModalController, config_1.ConfigProvider])
    ], OpenUrlModalController);
    return OpenUrlModalController;
}());
exports.OpenUrlModalController = OpenUrlModalController;
//# sourceMappingURL=open-url-modal.js.map
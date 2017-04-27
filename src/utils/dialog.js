import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
var Dialog = (function () {
    function Dialog(loadingCtrl, alertCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    Dialog.prototype.alert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['确定']
        });
        alert.present();
    };
    Dialog.prototype.confirm = function (title, message, handler) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                    text: '取消',
                    role: 'cancel'
                }, {
                    text: '确定',
                    handler: handler
                }]
        });
        alert.present();
    };
    Dialog.prototype.loading = function (content) {
        return this.loadingCtrl.create({
            content: content
        });
    };
    Dialog.prototype.toast = function (message, position) {
        if (position === void 0) { position = 'top'; }
        var toast = this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: position
        });
        toast.present();
    };
    return Dialog;
}());
export { Dialog };
Dialog.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Dialog.ctorParameters = function () { return [
    { type: LoadingController, },
    { type: AlertController, },
    { type: ToastController, },
]; };
//# sourceMappingURL=dialog.js.map
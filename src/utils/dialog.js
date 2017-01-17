import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
export var Dialog = (function () {
    function Dialog(loadingCtrl, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
    }
    Dialog.prototype.alert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['确定']
        });
        alert.present();
    };
    Dialog.prototype.loading = function (content) {
        return this.loadingCtrl.create({
            content: content
        });
    };
    Dialog.decorators = [
        { type: Injectable },
    ];
    Dialog.ctorParameters = [
        { type: LoadingController, },
        { type: AlertController, },
    ];
    return Dialog;
}());
//# sourceMappingURL=dialog.js.map
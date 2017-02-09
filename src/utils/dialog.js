"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
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
    Dialog.decorators = [
        { type: core_1.Injectable },
    ];
    Dialog.ctorParameters = [
        { type: ionic_angular_1.LoadingController, },
        { type: ionic_angular_1.AlertController, },
        { type: ionic_angular_1.ToastController, },
    ];
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map
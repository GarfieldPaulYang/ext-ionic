"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var Dialog = (function () {
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
        { type: core_1.Injectable },
    ];
    Dialog.ctorParameters = [
        { type: ionic_angular_1.LoadingController, },
        { type: ionic_angular_1.AlertController, },
    ];
    return Dialog;
}());
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map
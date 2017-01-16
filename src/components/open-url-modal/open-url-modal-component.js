"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var ionic_angular_1 = require('ionic-angular');
var util_1 = require('ionic-angular/util/util');
var OpenUrlModalCmp = (function () {
    function OpenUrlModalCmp(_navParams, viewCtrl, sanitizer) {
        this._navParams = _navParams;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.options = _navParams.get('openUrlModalOptions');
        util_1.assert(this.options, 'openUrlModal options must be valid');
        this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.options.url);
        window.addEventListener('message', this.options.onmessage, false);
    }
    OpenUrlModalCmp.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.options);
    };
    OpenUrlModalCmp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <ion-header>\n      <ion-navbar [color]=\"options.color\">\n        <ion-buttons end>\n          <button ion-button icon-only (click)=\"dismiss()\">\n            <ion-icon name=\"close\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title>{{options.title}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content class=\"open-url-modal-content\">\n      <iframe [src]=\"safeUrl\"></iframe>\n    </ion-content>\n  "
                },] },
    ];
    OpenUrlModalCmp.ctorParameters = [
        { type: ionic_angular_1.NavParams, },
        { type: ionic_angular_1.ViewController, },
        { type: platform_browser_1.DomSanitizer, },
    ];
    return OpenUrlModalCmp;
}());
exports.OpenUrlModalCmp = OpenUrlModalCmp;
//# sourceMappingURL=open-url-modal-component.js.map
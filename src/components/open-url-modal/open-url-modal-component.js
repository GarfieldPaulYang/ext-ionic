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
    OpenUrlModalCmp = __decorate([
        core_1.Component({
            template: "\n    <ion-header>\n      <ion-navbar [color]=\"options.color\">\n        <ion-buttons end>\n          <button ion-button icon-only (click)=\"dismiss()\">\n            <ion-icon name=\"close\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title>{{options.title}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content class=\"open-url-modal-content\">\n      <iframe [src]=\"safeUrl\"></iframe>\n    </ion-content>\n  "
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavParams, ionic_angular_1.ViewController, platform_browser_1.DomSanitizer])
    ], OpenUrlModalCmp);
    return OpenUrlModalCmp;
}());
exports.OpenUrlModalCmp = OpenUrlModalCmp;
//# sourceMappingURL=open-url-modal-component.js.map
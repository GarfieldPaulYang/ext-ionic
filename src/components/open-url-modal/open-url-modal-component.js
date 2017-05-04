import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewController, NavParams } from 'ionic-angular';
var OpenUrlModalCmp = (function () {
    function OpenUrlModalCmp(navParams, viewCtrl, sanitizer) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.options = navParams.get('openUrlModalOptions');
        this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.options.url);
        window.addEventListener('message', this.options.onmessage, false);
    }
    OpenUrlModalCmp.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.options).catch(function () { });
    };
    return OpenUrlModalCmp;
}());
export { OpenUrlModalCmp };
OpenUrlModalCmp.decorators = [
    { type: Component, args: [{
                template: "\n    <ion-header>\n      <ion-navbar [color]=\"options.color\">\n        <ion-buttons end>\n          <button ion-button icon-only (click)=\"dismiss()\">\n            <ion-icon name=\"close\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title>{{options.title}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content class=\"content\">\n      <iframe class=\"iframe\" [src]=\"safeUrl\"\n              sandbox=\"allow-scripts allow-top-navigation allow-pointer-lock allow-same-origin allow-popups allow-forms\">\n      </iframe>\n    </ion-content>\n  ",
                styles: ["\n    .scroll-content {\n      overflow: hidden;\n    }\n\n    .content {\n      height: 100%;\n    }\n\n    .iframe {\n      width: 100%;\n      height: 100%;\n      border: none;\n    }\n  "]
            },] },
];
/** @nocollapse */
OpenUrlModalCmp.ctorParameters = function () { return [
    { type: NavParams, },
    { type: ViewController, },
    { type: DomSanitizer, },
]; };
//# sourceMappingURL=open-url-modal-component.js.map
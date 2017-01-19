import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewController, NavParams } from 'ionic-angular';
import { assert } from 'ionic-angular/util/util';
export var OpenUrlModalCmp = (function () {
    function OpenUrlModalCmp(_navParams, viewCtrl, sanitizer) {
        this._navParams = _navParams;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.options = _navParams.get('openUrlModalOptions');
        assert(this.options, 'openUrlModal options must be valid');
        this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.options.url);
        window.addEventListener('message', this.options.onmessage, false);
    }
    OpenUrlModalCmp.prototype.dismiss = function () {
        this.viewCtrl.dismiss(this.options);
    };
    OpenUrlModalCmp.decorators = [
        { type: Component, args: [{
                    template: "\n    <ion-header>\n      <ion-navbar [color]=\"options.color\">\n        <ion-buttons end>\n          <button ion-button icon-only (click)=\"dismiss()\">\n            <ion-icon name=\"close\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title>{{options.title}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content class=\"open-url-modal-content\">\n      <iframe [src]=\"safeUrl\"></iframe>\n    </ion-content>\n  "
                },] },
    ];
    OpenUrlModalCmp.ctorParameters = [
        { type: NavParams, },
        { type: ViewController, },
        { type: DomSanitizer, },
    ];
    return OpenUrlModalCmp;
}());
//# sourceMappingURL=open-url-modal-component.js.map
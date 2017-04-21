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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const ionic_angular_1 = require("ionic-angular");
let OpenUrlModalCmp = class OpenUrlModalCmp {
    constructor(navParams, viewCtrl, sanitizer) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.sanitizer = sanitizer;
        this.options = navParams.get('openUrlModalOptions');
        this.safeUrl = sanitizer.bypassSecurityTrustResourceUrl(this.options.url);
        window.addEventListener('message', this.options.onmessage, false);
    }
    dismiss() {
        this.viewCtrl.dismiss(this.options);
    }
};
OpenUrlModalCmp = __decorate([
    core_1.Component({
        template: `
    <ion-header>
      <ion-navbar [color]="options.color">
        <ion-buttons end>
          <button ion-button icon-only (click)="dismiss()">
            <ion-icon name="close"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title>{{options.title}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="content">
      <iframe class="iframe" [src]="safeUrl"
              sandbox="allow-scripts allow-top-navigation allow-pointer-lock allow-same-origin allow-popups allow-forms">
      </iframe>
    </ion-content>
  `,
        styles: [`
    .scroll-content {
      overflow: hidden;
    }

    .content {
      height: 100%;
    }

    .iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `]
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavParams, ionic_angular_1.ViewController, platform_browser_1.DomSanitizer])
], OpenUrlModalCmp);
exports.OpenUrlModalCmp = OpenUrlModalCmp;
//# sourceMappingURL=open-url-modal-component.js.map
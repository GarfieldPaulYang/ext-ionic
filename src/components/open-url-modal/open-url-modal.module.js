"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var open_url_modal_component_1 = require("./open-url-modal-component");
var open_url_modal_1 = require("./open-url-modal");
var OpenUrlModalModule = OpenUrlModalModule_1 = (function () {
    function OpenUrlModalModule() {
    }
    OpenUrlModalModule.forRoot = function () {
        return {
            ngModule: OpenUrlModalModule_1,
            providers: [
                open_url_modal_1.OpenUrlModalController
            ]
        };
    };
    return OpenUrlModalModule;
}());
OpenUrlModalModule = OpenUrlModalModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            ionic_angular_1.IonicModule
        ],
        declarations: [
            open_url_modal_component_1.OpenUrlModalCmp
        ],
        entryComponents: [
            open_url_modal_component_1.OpenUrlModalCmp
        ]
    })
], OpenUrlModalModule);
exports.OpenUrlModalModule = OpenUrlModalModule;
var OpenUrlModalModule_1;
//# sourceMappingURL=open-url-modal.module.js.map
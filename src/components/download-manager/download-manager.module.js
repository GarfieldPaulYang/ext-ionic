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
var download_manager_component_1 = require("./download-manager-component");
var download_manager_1 = require("./download-manager");
var DownloadManagerModule = DownloadManagerModule_1 = (function () {
    function DownloadManagerModule() {
    }
    DownloadManagerModule.forRoot = function () {
        return {
            ngModule: DownloadManagerModule_1,
            providers: [
                download_manager_1.DownloadManagerController
            ]
        };
    };
    return DownloadManagerModule;
}());
DownloadManagerModule = DownloadManagerModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            ionic_angular_1.IonicModule
        ],
        declarations: [
            download_manager_component_1.DownloadManagerCmp
        ],
        entryComponents: [
            download_manager_component_1.DownloadManagerCmp
        ]
    })
], DownloadManagerModule);
exports.DownloadManagerModule = DownloadManagerModule;
var DownloadManagerModule_1;
//# sourceMappingURL=download-manager.module.js.map
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
var ionic_angular_1 = require('ionic-angular');
var image_loader_component_1 = require('./image-loader-component');
var image_loader_1 = require('./image-loader');
var ImageLoaderModule = (function () {
    function ImageLoaderModule() {
    }
    ImageLoaderModule.forRoot = function () {
        return {
            ngModule: ImageLoaderModule,
            providers: [
                image_loader_1.ImageLoaderController
            ]
        };
    };
    ImageLoaderModule = __decorate([
        core_1.NgModule({
            imports: [
                ionic_angular_1.IonicModule
            ],
            exports: [
                image_loader_component_1.ImageLoaderCmp
            ],
            declarations: [
                image_loader_component_1.ImageLoaderCmp
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ImageLoaderModule);
    return ImageLoaderModule;
}());
exports.ImageLoaderModule = ImageLoaderModule;
//# sourceMappingURL=image-loader.module.js.map
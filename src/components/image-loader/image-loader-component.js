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
var image_loader_1 = require("./image-loader");
var image_loader_config_1 = require("./image-loader-config");
var ImageLoaderCmp = (function () {
    function ImageLoaderCmp(element, renderer, imageLoader, config) {
        this.element = element;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        this.isLoading = true;
        if (!this.spinner && config.spinnerEnabled) {
            this.spinner = true;
        }
        if (!this.fallbackUrl) {
            this.fallbackUrl = config.fallbackUrl;
        }
        if (!this.useImg) {
            this.useImg = config.useImg;
        }
        if (!this.width) {
            this.width = config.width;
        }
        if (!this.height) {
            this.height = config.height;
        }
        if (!this.display) {
            this.display = config.display;
        }
        if (!this.backgroundSize) {
            this.backgroundSize = config.backgroundSize;
        }
        if (!this.backgroundRepeat) {
            this.backgroundRepeat = config.backgroundRepeat;
        }
    }
    ImageLoaderCmp.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.imageUrl) {
            if (this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
            }
            this.isLoading = false;
            return;
        }
        this.imageLoader.getImagePath(this.imageUrl).then(function (imageUrl) { return _this.setImage(imageUrl); })
            .catch(function (error) { return _this.setImage(_this.fallbackUrl || _this.imageUrl); });
    };
    ImageLoaderCmp.prototype.setImage = function (imageUrl) {
        var element;
        this.isLoading = false;
        if (this.useImg) {
            this.renderer.createElement(this.element.nativeElement, 'img');
            element = this.element.nativeElement.getElementsByTagName('IMG')[0];
            this.renderer.setElementAttribute(element, 'src', imageUrl);
            return;
        }
        element = this.element.nativeElement;
        if (this.display) {
            this.renderer.setElementStyle(element, 'display', this.display);
        }
        if (this.height) {
            this.renderer.setElementStyle(element, 'height', this.height);
        }
        if (this.width) {
            this.renderer.setElementStyle(element, 'width', this.width);
        }
        if (this.backgroundSize) {
            this.renderer.setElementStyle(element, 'background-size', this.backgroundSize);
        }
        if (this.backgroundRepeat) {
            this.renderer.setElementStyle(element, 'background-repeat', this.backgroundRepeat);
        }
        this.renderer.setElementStyle(element, 'background-image', 'url(\'' + imageUrl + '\')');
    };
    __decorate([
        core_1.Input('src'), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "imageUrl", void 0);
    __decorate([
        core_1.Input('fallback'), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "fallbackUrl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ImageLoaderCmp.prototype, "spinner", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ImageLoaderCmp.prototype, "useImg", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "display", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "backgroundSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageLoaderCmp.prototype, "backgroundRepeat", void 0);
    ImageLoaderCmp = __decorate([
        core_1.Component({
            selector: 'image-loader',
            template: '<image-loader-spinner *ngIf="spinner && isLoading"></image-loader-spinner>'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer, image_loader_1.ImageLoaderController, image_loader_config_1.ImageLoaderConfig])
    ], ImageLoaderCmp);
    return ImageLoaderCmp;
}());
exports.ImageLoaderCmp = ImageLoaderCmp;
//# sourceMappingURL=image-loader-component.js.map
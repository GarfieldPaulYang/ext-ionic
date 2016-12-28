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
var ImageLoaderConfig = (function () {
    function ImageLoaderConfig() {
        this.debugMode = false;
        this.spinnerEnabled = true;
        this.backgroundSize = 'contain';
        this.backgroundRepeat = 'no-repeat';
        this.display = 'block';
        this.width = '100%';
        this.height = '100%';
        this.useImg = false;
        this._cacheDirectoryName = 'image-loader-cache';
    }
    Object.defineProperty(ImageLoaderConfig.prototype, "cacheDirectoryName", {
        get: function () {
            return this._cacheDirectoryName;
        },
        set: function (name) {
            name.replace(/\W/g, '');
            this._cacheDirectoryName = name;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderConfig.prototype.enableDebugMode = function () {
        this.debugMode = true;
    };
    ImageLoaderConfig.prototype.enableSpinner = function (enable) {
        this.spinnerEnabled = enable;
    };
    ImageLoaderConfig.prototype.setCacheDirectoryName = function (name) {
        this.cacheDirectoryName = name;
    };
    ImageLoaderConfig.prototype.setHeight = function (height) {
        this.height = height;
    };
    ImageLoaderConfig.prototype.setWidth = function (width) {
        this.width = width;
    };
    ImageLoaderConfig.prototype.setDisplay = function (display) {
        this.display = display;
    };
    ImageLoaderConfig.prototype.useImageTag = function (use) {
        this.useImg = use;
    };
    ImageLoaderConfig.prototype.setBackgroundSize = function (backgroundSize) {
        this.backgroundSize = backgroundSize;
    };
    ImageLoaderConfig.prototype.setBackgroundRepeat = function (backgroundRepeat) {
        this.backgroundRepeat = backgroundRepeat;
    };
    ImageLoaderConfig.prototype.setFallbackUrl = function (fallbackUrl) {
        this.fallbackUrl = fallbackUrl;
    };
    ImageLoaderConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ImageLoaderConfig);
    return ImageLoaderConfig;
}());
exports.ImageLoaderConfig = ImageLoaderConfig;
//# sourceMappingURL=image-loader-config.js.map
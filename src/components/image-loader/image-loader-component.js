"use strict";
var core_1 = require('@angular/core');
var util_1 = require('ionic-angular/util/util');
var lodash_1 = require('lodash');
var image_loader_1 = require('./image-loader');
var config_1 = require('../../config/config');
var ImageLoaderCmp = (function () {
    function ImageLoaderCmp(element, renderer, imageLoader, config) {
        this.element = element;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        this.isLoading = true;
    }
    ImageLoaderCmp.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.spinner && this.config.imageLoader.spinnerEnabled) {
            this.spinner = true;
        }
        if (!this.fallbackUrl) {
            this.fallbackUrl = this.config.imageLoader.fallbackUrl;
        }
        if (lodash_1.isUndefined(this.useImg)) {
            this.useImg = this.config.imageLoader.useImg;
        }
        this.useImg = util_1.isTrueProperty(this.useImg);
        if (!this.width) {
            this.width = this.config.imageLoader.width;
        }
        if (!this.height) {
            this.height = this.config.imageLoader.height;
        }
        if (!this.display) {
            this.display = this.config.imageLoader.display;
        }
        if (!this.backgroundSize) {
            this.backgroundSize = this.config.imageLoader.backgroundSize;
        }
        if (!this.backgroundRepeat) {
            this.backgroundRepeat = this.config.imageLoader.backgroundRepeat;
        }
        if (!this.imageUrl) {
            if (this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
            }
            this.isLoading = false;
            return;
        }
        this.imageLoader.getImagePath(this.imageUrl).then(function (imageUrl) {
            _this.setImage(imageUrl);
        }).catch(function () {
            if (_this.fallbackUrl) {
                _this.setImage(_this.fallbackUrl);
            }
        });
    };
    ImageLoaderCmp.prototype.setImage = function (imageUrl) {
        var _this = this;
        var element;
        this.isLoading = false;
        if (this.useImg) {
            this.renderer.createElement(this.element.nativeElement, 'img');
            element = this.element.nativeElement.getElementsByTagName('IMG')[0];
            this.renderer.setElementAttribute(element, 'src', imageUrl);
            this.renderer.listen(element, 'error', function (event) {
                _this.imageLoader.removeCacheFile(imageUrl);
                if (_this.fallbackUrl) {
                    _this.renderer.setElementAttribute(element, 'src', _this.fallbackUrl);
                }
            });
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
    ImageLoaderCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-image-loader',
                    template: '<ion-spinner name="ios" *ngIf="spinner && isLoading"></ion-spinner>'
                },] },
    ];
    ImageLoaderCmp.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: image_loader_1.ImageLoaderController, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [config_1.WHCYIT_IONIC_CONFIG,] },] },
    ];
    ImageLoaderCmp.propDecorators = {
        'imageUrl': [{ type: core_1.Input, args: ['src',] },],
        'fallbackUrl': [{ type: core_1.Input, args: ['fallback',] },],
        'spinner': [{ type: core_1.Input },],
        'useImg': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'display': [{ type: core_1.Input },],
        'backgroundSize': [{ type: core_1.Input },],
        'backgroundRepeat': [{ type: core_1.Input },],
    };
    return ImageLoaderCmp;
}());
exports.ImageLoaderCmp = ImageLoaderCmp;
//# sourceMappingURL=image-loader-component.js.map
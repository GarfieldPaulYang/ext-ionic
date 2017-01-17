import { Component, Input, ElementRef, Renderer, Inject } from '@angular/core';
import { isTrueProperty } from 'ionic-angular/util/util';
import * as _ from 'lodash';
import { ImageLoaderController } from "./image-loader";
import { WHCYIT_IONIC_CONFIG } from "../../config/config";
export var ImageLoaderCmp = (function () {
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
        if (_.isUndefined(this.useImg)) {
            this.useImg = this.config.imageLoader.useImg;
        }
        this.useImg = isTrueProperty(this.useImg);
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
        { type: Component, args: [{
                    selector: 'ion-image-loader',
                    template: '<ion-spinner name="ios" *ngIf="spinner && isLoading"></ion-spinner>'
                },] },
    ];
    ImageLoaderCmp.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: ImageLoaderController, },
        { type: undefined, decorators: [{ type: Inject, args: [WHCYIT_IONIC_CONFIG,] },] },
    ];
    ImageLoaderCmp.propDecorators = {
        'imageUrl': [{ type: Input, args: ['src',] },],
        'fallbackUrl': [{ type: Input, args: ['fallback',] },],
        'spinner': [{ type: Input },],
        'useImg': [{ type: Input },],
        'width': [{ type: Input },],
        'height': [{ type: Input },],
        'display': [{ type: Input },],
        'backgroundSize': [{ type: Input },],
        'backgroundRepeat': [{ type: Input },],
    };
    return ImageLoaderCmp;
}());
//# sourceMappingURL=image-loader-component.js.map
import { Component, Input, ElementRef, Renderer, Output, EventEmitter } from '@angular/core';
import { isTrueProperty } from '../../utils/util';
import { ImageLoaderController } from './image-loader';
import { ConfigProvider } from '../../config/config';
var ImageLoaderCmp = (function () {
    function ImageLoaderCmp(elementRef, renderer, imageLoader, config) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        this.cache = true;
        this.fallbackUrl = this.config.get().imageLoader.fallbackUrl;
        this.spinner = this.config.get().imageLoader.spinnerEnabled;
        this.fallbackAsPlaceholder = this.config.get().imageLoader.fallbackAsPlaceholder;
        this.useImg = this.config.get().imageLoader.useImg;
        this.width = this.config.get().imageLoader.width;
        this.height = this.config.get().imageLoader.height;
        this.display = this.config.get().imageLoader.display;
        this.backgroundSize = this.config.get().imageLoader.backgroundSize;
        this.backgroundRepeat = this.config.get().imageLoader.backgroundRepeat;
        this.spinnerName = this.config.get().imageLoader.spinnerName;
        this.spinnerColor = this.config.get().imageLoader.spinnerColor;
        this.load = new EventEmitter();
        this.isLoading = true;
    }
    Object.defineProperty(ImageLoaderCmp.prototype, "src", {
        get: function () {
            return this._src;
        },
        set: function (imageUrl) {
            this._src = this.processImageUrl(imageUrl);
            this.updateImage(this._src);
        },
        enumerable: true,
        configurable: true
    });
    ;
    ImageLoaderCmp.prototype.ngOnInit = function () {
        this.useImg = isTrueProperty(this.useImg);
        this.cache = isTrueProperty(this.cache);
        this.fallbackAsPlaceholder = isTrueProperty(this.fallbackAsPlaceholder);
        if (this.fallbackAsPlaceholder && this.fallbackUrl) {
            this.setImage(this.fallbackUrl, false);
        }
        if (!this.src) {
            if (!this.fallbackAsPlaceholder && this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
                return;
            }
            this.isLoading = false;
        }
    };
    ImageLoaderCmp.prototype.processImageUrl = function (imageUrl) {
        if (this.cache === false) {
            if (imageUrl.indexOf('?') === -1) {
                imageUrl += '?';
            }
            if (['&', '?'].indexOf(imageUrl.charAt(imageUrl.length)) === -1) {
                imageUrl += '&';
            }
            imageUrl += 'cache_buster=' + Date.now();
        }
        return imageUrl;
    };
    ImageLoaderCmp.prototype.updateImage = function (imageUrl) {
        var _this = this;
        this.imageLoader.getImagePath(imageUrl).then(function (imageUrl) { return _this.setImage(imageUrl); })
            .catch(function (error) { return _this.setImage(_this.fallbackUrl || imageUrl); });
    };
    ImageLoaderCmp.prototype.setImage = function (imageUrl, stopLoading) {
        var _this = this;
        if (stopLoading === void 0) { stopLoading = true; }
        this.isLoading = !stopLoading;
        if (this.useImg) {
            if (!this.element) {
                this.element = this.renderer.createElement(this.elementRef.nativeElement, 'img');
            }
            this.renderer.listen(this.element, 'error', function (event) {
                _this.imageLoader.removeCacheFile(imageUrl);
                if (_this.fallbackUrl) {
                    _this.renderer.setElementAttribute(_this.element, 'src', _this.fallbackUrl);
                }
            });
            this.renderer.setElementAttribute(this.element, 'src', imageUrl);
        }
        else {
            this.element = this.elementRef.nativeElement;
            if (this.display) {
                this.renderer.setElementStyle(this.element, 'display', this.display);
            }
            if (this.height) {
                this.renderer.setElementStyle(this.element, 'height', this.height);
            }
            if (this.width) {
                this.renderer.setElementStyle(this.element, 'width', this.width);
            }
            if (this.backgroundSize) {
                this.renderer.setElementStyle(this.element, 'background-size', this.backgroundSize);
            }
            if (this.backgroundRepeat) {
                this.renderer.setElementStyle(this.element, 'background-repeat', this.backgroundRepeat);
            }
            this.renderer.setElementStyle(this.element, 'background-image', 'url(\'' + (imageUrl || this.fallbackUrl) + '\')');
        }
        this.load.emit(this);
    };
    return ImageLoaderCmp;
}());
export { ImageLoaderCmp };
ImageLoaderCmp.decorators = [
    { type: Component, args: [{
                selector: 'ion-image-loader',
                template: '<ion-spinner *ngIf="spinner && isLoading && !fallbackAsPlaceholder" [name]="spinnerName" [color]="spinnerColor"></ion-spinner>',
                styles: ["\n    ion-spinner {\n      float: none;\n      display: block;\n      margin: auto;\n    }\n  "]
            },] },
];
/** @nocollapse */
ImageLoaderCmp.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ImageLoaderController, },
    { type: ConfigProvider, },
]; };
ImageLoaderCmp.propDecorators = {
    'src': [{ type: Input },],
    'cache': [{ type: Input },],
    'fallbackUrl': [{ type: Input, args: ['fallback',] },],
    'spinner': [{ type: Input },],
    'fallbackAsPlaceholder': [{ type: Input },],
    'useImg': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'display': [{ type: Input },],
    'backgroundSize': [{ type: Input },],
    'backgroundRepeat': [{ type: Input },],
    'spinnerName': [{ type: Input },],
    'spinnerColor': [{ type: Input },],
    'load': [{ type: Output },],
};
//# sourceMappingURL=image-loader-component.js.map
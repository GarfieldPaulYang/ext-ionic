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
const util_1 = require("../../utils/util");
const image_loader_1 = require("./image-loader");
const config_1 = require("../../config/config");
let ImageLoaderCmp = class ImageLoaderCmp {
    constructor(elementRef, renderer, imageLoader, config) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        this.cache = true;
        this.fallbackUrl = this.config.get().imageLoader.fallbackUrl;
        this.spinner = this.config.get().imageLoader.spinnerEnabled;
        this.useImg = this.config.get().imageLoader.useImg;
        this.width = this.config.get().imageLoader.width;
        this.height = this.config.get().imageLoader.height;
        this.display = this.config.get().imageLoader.display;
        this.backgroundSize = this.config.get().imageLoader.backgroundSize;
        this.backgroundRepeat = this.config.get().imageLoader.backgroundRepeat;
        this.load = new core_1.EventEmitter();
        this.isLoading = true;
    }
    set src(imageUrl) {
        this._src = this.processImageUrl(imageUrl);
        this.updateImage(this._src);
    }
    ;
    get src() {
        return this._src;
    }
    ngOnInit() {
        this.useImg = util_1.isTrueProperty(this.useImg);
        this.cache = util_1.isTrueProperty(this.cache);
        if (!this.src) {
            if (this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
            }
            this.isLoading = false;
            return;
        }
    }
    processImageUrl(imageUrl) {
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
    }
    updateImage(imageUrl) {
        this.imageLoader.getImagePath(imageUrl).then((imageUrl) => this.setImage(imageUrl))
            .catch((error) => this.setImage(this.fallbackUrl || imageUrl));
    }
    setImage(imageUrl) {
        this.isLoading = false;
        if (this.useImg) {
            if (!this.element) {
                this.element = this.renderer.createElement(this.elementRef.nativeElement, 'img');
            }
            /*this.renderer.listen(this.imgElement, 'error', (event: any) => {
              this.imageLoader.removeCacheFile(imageUrl);
              if (this.fallbackUrl) {
                this.renderer.setElementAttribute(this.imgElement, 'src', this.fallbackUrl);
              }
            });*/
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
            this.renderer.setElementStyle(this.element, 'background-image', 'url(\'' + imageUrl + '\')');
        }
        this.load.emit(this);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ImageLoaderCmp.prototype, "src", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ImageLoaderCmp.prototype, "cache", void 0);
__decorate([
    core_1.Input('fallback'),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "fallbackUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ImageLoaderCmp.prototype, "spinner", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ImageLoaderCmp.prototype, "useImg", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "display", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "backgroundSize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "backgroundRepeat", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ImageLoaderCmp.prototype, "load", void 0);
ImageLoaderCmp = __decorate([
    core_1.Component({
        selector: 'ion-image-loader',
        template: '<ion-spinner *ngIf="spinner && isLoading"></ion-spinner>',
        styles: [`
    ion-spinner {
      float: none;
      display: block;
      margin: auto;
    }
  `]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        image_loader_1.ImageLoaderController,
        config_1.ConfigProvider])
], ImageLoaderCmp);
exports.ImageLoaderCmp = ImageLoaderCmp;
//# sourceMappingURL=image-loader-component.js.map
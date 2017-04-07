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
const _ = require("lodash");
const image_loader_1 = require("./image-loader");
const config_1 = require("../../config/config");
let ImageLoaderCmp = class ImageLoaderCmp {
    constructor(element, renderer, imageLoader, config) {
        this.element = element;
        this.renderer = renderer;
        this.imageLoader = imageLoader;
        this.config = config;
        this.isLoading = true;
    }
    ngOnInit() {
        if (!this.spinner && this.config.get().imageLoader.spinnerEnabled) {
            this.spinner = true;
        }
        if (!this.fallbackUrl) {
            this.fallbackUrl = this.config.get().imageLoader.fallbackUrl;
        }
        if (_.isUndefined(this.useImg)) {
            this.useImg = this.config.get().imageLoader.useImg;
        }
        this.useImg = util_1.isTrueProperty(this.useImg);
        if (!this.width) {
            this.width = this.config.get().imageLoader.width;
        }
        if (!this.height) {
            this.height = this.config.get().imageLoader.height;
        }
        if (!this.display) {
            this.display = this.config.get().imageLoader.display;
        }
        if (!this.backgroundSize) {
            this.backgroundSize = this.config.get().imageLoader.backgroundSize;
        }
        if (!this.backgroundRepeat) {
            this.backgroundRepeat = this.config.get().imageLoader.backgroundRepeat;
        }
        if (!this.imageUrl) {
            if (this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
            }
            this.isLoading = false;
            return;
        }
        this.imageLoader.getImagePath(this.imageUrl).then((imageUrl) => {
            this.setImage(imageUrl);
        }).catch(() => {
            if (this.fallbackUrl) {
                this.setImage(this.fallbackUrl);
            }
        });
    }
    setImage(imageUrl) {
        let element;
        this.isLoading = false;
        if (this.useImg) {
            this.renderer.createElement(this.element.nativeElement, 'img');
            element = this.element.nativeElement.getElementsByTagName('IMG')[0];
            this.renderer.setElementAttribute(element, 'src', imageUrl);
            this.renderer.listen(element, 'error', (event) => {
                this.imageLoader.removeCacheFile(imageUrl);
                if (this.fallbackUrl) {
                    this.renderer.setElementAttribute(element, 'src', this.fallbackUrl);
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
    }
};
__decorate([
    core_1.Input('src'),
    __metadata("design:type", String)
], ImageLoaderCmp.prototype, "imageUrl", void 0);
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
ImageLoaderCmp = __decorate([
    core_1.Component({
        selector: 'ion-image-loader',
        template: '<ion-spinner *ngIf="spinner && isLoading"></ion-spinner>',
        styles: [`
    ion-spinner {
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
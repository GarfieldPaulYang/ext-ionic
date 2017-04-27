import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageLoaderCmp } from './image-loader-component';
import { ImageLoaderController } from './image-loader';
var ImageLoaderModule = (function () {
    function ImageLoaderModule() {
    }
    ImageLoaderModule.forRoot = function () {
        return {
            ngModule: ImageLoaderModule,
            providers: [
                ImageLoaderController
            ]
        };
    };
    return ImageLoaderModule;
}());
export { ImageLoaderModule };
ImageLoaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule
                ],
                exports: [
                    ImageLoaderCmp
                ],
                declarations: [
                    ImageLoaderCmp
                ]
            },] },
];
/** @nocollapse */
ImageLoaderModule.ctorParameters = function () { return []; };
//# sourceMappingURL=image-loader.module.js.map
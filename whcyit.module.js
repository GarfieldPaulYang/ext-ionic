var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import './src/rxjs-extensions';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import * as _ from 'lodash';
import { DynamicComponentModuleFactory } from 'angular2-dynamic-component';
import { WHCYIT_IONIC_CONFIG, defaultConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/utils/http/http';
import { MapToIterable } from './src/pipes/map-to-iterable';
import { OrderBy } from './src/pipes/order-by';
import { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
import { BaiduMapController } from './src/components/baidu-map/baidu-map';
import { BaiduMap } from './src/components/baidu-map/baidu-map-component';
import { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
import { ImageLoaderController } from './src/components/image-loader/image-loader';
import { StarRatingCmp } from './src/components/star-rating/star-rating';
export var WhcyitModule = (function () {
    function WhcyitModule() {
    }
    WhcyitModule.forRoot = function (config) {
        return {
            ngModule: WhcyitModule,
            providers: [
                { provide: WHCYIT_IONIC_CONFIG, useValue: _.isUndefined(config) ? defaultConfig : _.assign({}, defaultConfig, config) },
                OpenUrlModalController,
                BaiduMapController,
                ImageLoaderController,
                Dialog,
                HttpProvider,
                CorsHttpProvider,
                MapToIterable,
                OrderBy
            ]
        };
    };
    WhcyitModule = __decorate([
        NgModule({
            imports: [
                IonicModule,
                DynamicComponentModuleFactory.buildModule([IonicModule])
            ],
            exports: [
                MapToIterable,
                OrderBy,
                AlphaScroll,
                BaiduMap,
                ImageLoaderCmp,
                StarRatingCmp
            ],
            declarations: [
                MapToIterable,
                OrderBy,
                AlphaScroll,
                BaiduMap,
                ImageLoaderCmp,
                StarRatingCmp,
                OpenUrlModalCmp
            ],
            entryComponents: [
                OpenUrlModalCmp
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WhcyitModule);
    return WhcyitModule;
}());
//# sourceMappingURL=whcyit.module.js.map
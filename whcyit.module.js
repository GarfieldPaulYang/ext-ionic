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
require('./src/rxjs-extensions');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var _ = require('lodash');
var config_1 = require('./src/config/config');
var dialog_1 = require('./src/utils/dialog');
var http_1 = require('./src/utils/http/http');
var map_to_iterable_1 = require('./src/pipes/map-to-iterable');
var order_by_1 = require('./src/pipes/order-by');
var alpha_scroll_1 = require('./src/components/alpha-scroll/alpha-scroll');
var open_url_modal_component_1 = require('./src/components/open-url-modal/open-url-modal-component');
var open_url_modal_1 = require('./src/components/open-url-modal/open-url-modal');
var baidu_map_1 = require('./src/components/baidu-map/baidu-map');
var baidu_map_component_1 = require('./src/components/baidu-map/baidu-map-component');
var image_loader_component_1 = require('./src/components/image-loader/image-loader-component');
var image_loader_1 = require('./src/components/image-loader/image-loader');
var star_rating_1 = require('./src/components/star-rating/star-rating');
var WhcyitModule = (function () {
    function WhcyitModule() {
    }
    WhcyitModule.forRoot = function (config) {
        return {
            ngModule: WhcyitModule,
            providers: [
                { provide: config_1.WHCYIT_IONIC_CONFIG, useValue: _.isUndefined(config) ? config_1.defaultConfig : _.assign({}, config_1.defaultConfig, config) },
                open_url_modal_1.OpenUrlModalController,
                baidu_map_1.BaiduMapController,
                image_loader_1.ImageLoaderController,
                dialog_1.Dialog,
                http_1.HttpProvider,
                http_1.CorsHttpProvider,
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy
            ]
        };
    };
    WhcyitModule = __decorate([
        core_1.NgModule({
            imports: [
                ionic_angular_1.IonicModule
            ],
            exports: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy,
                alpha_scroll_1.AlphaScroll,
                baidu_map_component_1.BaiduMap,
                image_loader_component_1.ImageLoaderCmp,
                star_rating_1.StarRatingCmp
            ],
            declarations: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy,
                alpha_scroll_1.AlphaScroll,
                baidu_map_component_1.BaiduMap,
                image_loader_component_1.ImageLoaderCmp,
                star_rating_1.StarRatingCmp,
                open_url_modal_component_1.OpenUrlModalCmp
            ],
            entryComponents: [
                open_url_modal_component_1.OpenUrlModalCmp
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], WhcyitModule);
    return WhcyitModule;
}());
exports.WhcyitModule = WhcyitModule;
//# sourceMappingURL=whcyit.module.js.map
"use strict";
var immerse_plugin_1 = require('./src/native/immerse-plugin');
exports.Immerse = immerse_plugin_1.Immerse;
var local_notifications_1 = require('./src/native/local-notifications');
exports.ExtLocalNotifications = local_notifications_1.ExtLocalNotifications;
var config_1 = require('./src/config/config');
exports.ConfigProvider = config_1.ConfigProvider;
var response_result_1 = require('./src/utils/http/response/response-result');
exports.ResponseResult = response_result_1.ResponseResult;
exports.Pagination = response_result_1.Pagination;
var url_params_builder_1 = require('./src/utils/http/url-params-builder');
exports.URLParamsBuilder = url_params_builder_1.URLParamsBuilder;
var console_error_handler_1 = require('./src/utils/console-error-handler');
exports.ConsoleErrorHandler = console_error_handler_1.ConsoleErrorHandler;
var hot_updater_1 = require('./src/providers/hot-updater');
exports.HotUpdater = hot_updater_1.HotUpdater;
var component_registar_1 = require('./src/providers/component-registar');
exports.ComponentRegistar = component_registar_1.ComponentRegistar;
var file_storage_1 = require('./src/providers/file-storage/file-storage');
exports.TextFileStorage = file_storage_1.TextFileStorage;
var json_file_storage_1 = require('./src/providers/file-storage/json-file-storage');
exports.JsonFileStorage = json_file_storage_1.JsonFileStorage;
var map_to_iterable_1 = require('./src/pipes/map-to-iterable');
exports.MapToIterable = map_to_iterable_1.MapToIterable;
var order_by_1 = require('./src/pipes/order-by');
exports.OrderBy = order_by_1.OrderBy;
var alpha_scroll_1 = require('./src/components/alpha-scroll/alpha-scroll');
exports.AlphaScroll = alpha_scroll_1.AlphaScroll;
var open_url_modal_1 = require('./src/components/open-url-modal/open-url-modal');
exports.OpenUrlModalController = open_url_modal_1.OpenUrlModalController;
var baidu_map_component_1 = require('./src/components/baidu-map/baidu-map-component');
exports.BaiduMap = baidu_map_component_1.BaiduMap;
var image_loader_component_1 = require('./src/components/image-loader/image-loader-component');
exports.ImageLoaderCmp = image_loader_component_1.ImageLoaderCmp;
var star_rating_1 = require('./src/components/star-rating/star-rating');
exports.StarRatingCmp = star_rating_1.StarRatingCmp;
var string_1 = require('./src/utils/string');
exports.StringUtils = string_1.StringUtils;
var util_1 = require('./src/utils/util');
exports.assert = util_1.assert;
exports.isTrueProperty = util_1.isTrueProperty;
exports.isPresent = util_1.isPresent;
var dialog_1 = require('./src/utils/dialog');
exports.Dialog = dialog_1.Dialog;
var http_1 = require('./src/providers/http');
exports.HttpProviderOptions = http_1.HttpProviderOptions;
exports.HttpProvider = http_1.HttpProvider;
exports.CorsHttpProvider = http_1.CorsHttpProvider;
require('./src/rxjs-extensions');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var config_2 = require('./src/config/config');
var dialog_2 = require('./src/utils/dialog');
var http_2 = require('./src/providers/http');
var hot_updater_2 = require('./src/providers/hot-updater');
var component_registar_2 = require('./src/providers/component-registar');
var file_storage_2 = require('./src/providers/file-storage/file-storage');
var json_file_storage_2 = require('./src/providers/file-storage/json-file-storage');
var map_to_iterable_2 = require('./src/pipes/map-to-iterable');
var order_by_2 = require('./src/pipes/order-by');
var alpha_scroll_2 = require('./src/components/alpha-scroll/alpha-scroll');
var open_url_modal_component_1 = require('./src/components/open-url-modal/open-url-modal-component');
var open_url_modal_2 = require('./src/components/open-url-modal/open-url-modal');
var baidu_map_1 = require('./src/components/baidu-map/baidu-map');
var baidu_map_component_2 = require('./src/components/baidu-map/baidu-map-component');
var image_loader_component_2 = require('./src/components/image-loader/image-loader-component');
var image_loader_1 = require('./src/components/image-loader/image-loader');
var star_rating_2 = require('./src/components/star-rating/star-rating');
var EXPORTS = [
    map_to_iterable_2.MapToIterable,
    order_by_2.OrderBy,
    alpha_scroll_2.AlphaScroll,
    baidu_map_component_2.BaiduMap,
    image_loader_component_2.ImageLoaderCmp,
    star_rating_2.StarRatingCmp,
];
var ExtIonicModule = (function () {
    function ExtIonicModule() {
    }
    ExtIonicModule.forRoot = function (config) {
        return {
            ngModule: ExtIonicModule,
            providers: [
                { provide: config_2.EXT_IONIC_CONFIG, useValue: config },
                { provide: config_2.ConfigProvider, useFactory: config_2.setupConfig, deps: [config_2.EXT_IONIC_CONFIG] },
                open_url_modal_2.OpenUrlModalController,
                baidu_map_1.BaiduMapController,
                image_loader_1.ImageLoaderController,
                dialog_2.Dialog,
                http_2.HttpProvider,
                http_2.CorsHttpProvider,
                map_to_iterable_2.MapToIterable,
                order_by_2.OrderBy,
                hot_updater_2.HotUpdater,
                component_registar_2.ComponentRegistar,
                file_storage_2.TextFileStorage,
                json_file_storage_2.JsonFileStorage
            ]
        };
    };
    ExtIonicModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        ionic_angular_1.IonicModule
                    ],
                    exports: EXPORTS,
                    declarations: [
                        EXPORTS,
                        open_url_modal_component_1.OpenUrlModalCmp
                    ],
                    entryComponents: [
                        open_url_modal_component_1.OpenUrlModalCmp
                    ]
                },] },
    ];
    ExtIonicModule.ctorParameters = [];
    return ExtIonicModule;
}());
exports.ExtIonicModule = ExtIonicModule;
//# sourceMappingURL=index.js.map
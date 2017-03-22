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
var immerse_plugin_1 = require('./src/native/immerse-plugin');
exports.Immerse = immerse_plugin_1.Immerse;
var local_notifications_1 = require('./src/native/local-notifications');
exports.ExtLocalNotifications = local_notifications_1.ExtLocalNotifications;
var hot_code_push_1 = require('./src/native/hot-code-push');
exports.HotCodePush = hot_code_push_1.HotCodePush;
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
var alpha_scroll_module_1 = require('./src/components/alpha-scroll/alpha-scroll.module');
exports.AlphaScrollModule = alpha_scroll_module_1.AlphaScrollModule;
var open_url_modal_module_1 = require('./src/components/open-url-modal/open-url-modal.module');
exports.OpenUrlModalModule = open_url_modal_module_1.OpenUrlModalModule;
var open_url_modal_1 = require('./src/components/open-url-modal/open-url-modal');
exports.OpenUrlModalController = open_url_modal_1.OpenUrlModalController;
var baidu_map_module_1 = require('./src/components/baidu-map/baidu-map.module');
exports.BaiduMapModule = baidu_map_module_1.BaiduMapModule;
var baidu_map_1 = require('./src/components/baidu-map/baidu-map');
exports.BaiduMapController = baidu_map_1.BaiduMapController;
var image_loader_module_1 = require('./src/components/image-loader/image-loader.module');
exports.ImageLoaderModule = image_loader_module_1.ImageLoaderModule;
var star_rating_module_1 = require('./src/components/star-rating/star-rating.module');
exports.StarRatingModule = star_rating_module_1.StarRatingModule;
var ribbon_module_1 = require('./src/components/ribbon/ribbon.module');
exports.RibbonModule = ribbon_module_1.RibbonModule;
var download_manager_module_1 = require('./src/components/download-manager/download-manager.module');
exports.DownloadManagerModule = download_manager_module_1.DownloadManagerModule;
var download_manager_1 = require('./src/components/download-manager/download-manager');
exports.DownloadManagerController = download_manager_1.DownloadManagerController;
var string_1 = require('./src/utils/string');
exports.StringUtils = string_1.StringUtils;
var util_1 = require('./src/utils/util');
exports.assert = util_1.assert;
exports.isTrueProperty = util_1.isTrueProperty;
exports.isPresent = util_1.isPresent;
exports.flattenObject = util_1.flattenObject;
exports.unFlattenObject = util_1.unFlattenObject;
var dialog_1 = require('./src/utils/dialog');
exports.Dialog = dialog_1.Dialog;
var http_1 = require('./src/providers/http');
exports.HttpProviderOptions = http_1.HttpProviderOptions;
exports.HttpProvider = http_1.HttpProvider;
exports.CorsHttpProvider = http_1.CorsHttpProvider;
exports.ticket_expired = http_1.ticket_expired;
require('./src/rxjs-extensions');
var transfer_1 = require('@ionic-native/transfer');
var file_opener_1 = require('@ionic-native/file-opener');
var file_1 = require('@ionic-native/file');
var device_1 = require('@ionic-native/device');
var immerse_plugin_2 = require('./src/native/immerse-plugin');
var hot_code_push_2 = require('./src/native/hot-code-push');
var local_notifications_2 = require('./src/native/local-notifications');
var core_1 = require('@angular/core');
var config_2 = require('./src/config/config');
var dialog_2 = require('./src/utils/dialog');
var http_2 = require('./src/providers/http');
var hot_updater_2 = require('./src/providers/hot-updater');
var component_registar_2 = require('./src/providers/component-registar');
var file_storage_2 = require('./src/providers/file-storage/file-storage');
var json_file_storage_2 = require('./src/providers/file-storage/json-file-storage');
var map_to_iterable_2 = require('./src/pipes/map-to-iterable');
var order_by_2 = require('./src/pipes/order-by');
var alpha_scroll_module_2 = require('./src/components/alpha-scroll/alpha-scroll.module');
var open_url_modal_module_2 = require('./src/components/open-url-modal/open-url-modal.module');
var baidu_map_module_2 = require('./src/components/baidu-map/baidu-map.module');
var image_loader_module_2 = require('./src/components/image-loader/image-loader.module');
var star_rating_module_2 = require('./src/components/star-rating/star-rating.module');
var ribbon_module_2 = require('./src/components/ribbon/ribbon.module');
var download_manager_module_2 = require('./src/components/download-manager/download-manager.module');
var EXPORTS = [
    map_to_iterable_2.MapToIterable,
    order_by_2.OrderBy
];
var ExtIonicModule = (function () {
    function ExtIonicModule() {
    }
    ExtIonicModule.forRoot = function (config) {
        return {
            ngModule: ExtIonicModule,
            providers: [
                transfer_1.Transfer,
                file_1.File,
                file_opener_1.FileOpener,
                device_1.Device,
                { provide: config_2.EXT_IONIC_CONFIG, useValue: config },
                { provide: config_2.ConfigProvider, useFactory: config_2.setupConfig, deps: [config_2.EXT_IONIC_CONFIG] },
                dialog_2.Dialog,
                http_2.HttpProvider,
                http_2.CorsHttpProvider,
                map_to_iterable_2.MapToIterable,
                order_by_2.OrderBy,
                hot_updater_2.HotUpdater,
                component_registar_2.ComponentRegistar,
                file_storage_2.TextFileStorage,
                json_file_storage_2.JsonFileStorage,
                immerse_plugin_2.Immerse,
                hot_code_push_2.HotCodePush,
                local_notifications_2.ExtLocalNotifications
            ]
        };
    };
    ExtIonicModule = __decorate([
        core_1.NgModule({
            imports: [
                alpha_scroll_module_2.AlphaScrollModule.forRoot(),
                baidu_map_module_2.BaiduMapModule.forRoot(),
                image_loader_module_2.ImageLoaderModule.forRoot(),
                download_manager_module_2.DownloadManagerModule.forRoot(),
                open_url_modal_module_2.OpenUrlModalModule.forRoot(),
                ribbon_module_2.RibbonModule.forRoot(),
                star_rating_module_2.StarRatingModule.forRoot()
            ],
            exports: [
                alpha_scroll_module_2.AlphaScrollModule,
                baidu_map_module_2.BaiduMapModule,
                image_loader_module_2.ImageLoaderModule,
                download_manager_module_2.DownloadManagerModule,
                open_url_modal_module_2.OpenUrlModalModule,
                ribbon_module_2.RibbonModule,
                star_rating_module_2.StarRatingModule,
                EXPORTS
            ],
            declarations: [
                EXPORTS
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ExtIonicModule);
    return ExtIonicModule;
}());
exports.ExtIonicModule = ExtIonicModule;
//# sourceMappingURL=index.js.map
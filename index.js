export { Immerse } from './src/native/immerse-plugin';
export { ExtLocalNotifications } from './src/native/local-notifications';
export { HotCodePush } from './src/native/hot-code-push';
export { ConfigProvider } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { ConsoleErrorHandler } from './src/utils/console-error-handler';
export { HotUpdater } from './src/providers/hot-updater';
export { ComponentRegistar } from './src/providers/component-registar';
export { MemoryStorage } from './src/providers/storage/mem-storage';
export { TextFileStorage } from './src/providers/storage/file-storage';
export { JsonFileStorage } from './src/providers/storage/json-file-storage';
export * from './src/pipes/pipes.module';
export * from './src/components/alpha-scroll/alpha-scroll.module';
export * from './src/components/open-url-modal/open-url-modal.module';
export * from './src/components/baidu-map/baidu-map.module';
export * from './src/components/image-loader/image-loader.module';
export * from './src/components/star-rating/star-rating.module';
export * from './src/components/ribbon/ribbon.module';
export * from './src/components/super-tabs/super-tabs.module';
export * from './src/components/download-manager/download-manager.module';
export { StringUtils } from './src/utils/string';
export { isTrueProperty, isPresent, flattenObject, unFlattenObject } from './src/utils/util';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptions, HttpProvider, CorsHttpProvider, ticket_expired } from './src/providers/http/http';
import './src/rxjs-extensions';
import { Transfer } from '@ionic-native/transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { Immerse } from './src/native/immerse-plugin';
import { HotCodePush } from './src/native/hot-code-push';
import { ExtLocalNotifications } from './src/native/local-notifications';
import { NgModule } from '@angular/core';
import { EXT_IONIC_CONFIG, ConfigProvider, setupConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/providers/http/http';
import { HotUpdater } from './src/providers/hot-updater';
import { ComponentRegistar } from './src/providers/component-registar';
import { MemoryStorage } from './src/providers/storage/mem-storage';
import { TextFileStorage } from './src/providers/storage/file-storage';
import { JsonFileStorage } from './src/providers/storage/json-file-storage';
import { PipesModule } from './src/pipes/pipes.module';
import { AlphaScrollModule } from './src/components/alpha-scroll/alpha-scroll.module';
import { OpenUrlModalModule } from './src/components/open-url-modal/open-url-modal.module';
import { BaiduMapModule } from './src/components/baidu-map/baidu-map.module';
import { ImageLoaderModule } from './src/components/image-loader/image-loader.module';
import { StarRatingModule } from './src/components/star-rating/star-rating.module';
import { RibbonModule } from './src/components/ribbon/ribbon.module';
import { SuperTabsModule } from './src/components/super-tabs/super-tabs.module';
import { DownloadManagerModule } from './src/components/download-manager/download-manager.module';
var PROVIDERS = [
    Transfer,
    File,
    FileOpener,
    Device,
    Dialog,
    HttpProvider,
    CorsHttpProvider,
    HotUpdater,
    ComponentRegistar,
    MemoryStorage,
    TextFileStorage,
    JsonFileStorage,
    Immerse,
    HotCodePush,
    ExtLocalNotifications
];
var ExtIonicModule = (function () {
    function ExtIonicModule() {
    }
    ExtIonicModule.forRoot = function (config) {
        return {
            ngModule: ExtIonicModule,
            providers: [
                { provide: EXT_IONIC_CONFIG, useValue: config },
                { provide: ConfigProvider, useFactory: setupConfig, deps: [EXT_IONIC_CONFIG] },
                PROVIDERS
            ]
        };
    };
    return ExtIonicModule;
}());
export { ExtIonicModule };
ExtIonicModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    AlphaScrollModule.forRoot(),
                    BaiduMapModule.forRoot(),
                    ImageLoaderModule.forRoot(),
                    DownloadManagerModule.forRoot(),
                    OpenUrlModalModule.forRoot(),
                    RibbonModule.forRoot(),
                    SuperTabsModule.forRoot(),
                    StarRatingModule.forRoot(),
                    PipesModule.forRoot()
                ],
                exports: [
                    AlphaScrollModule,
                    BaiduMapModule,
                    ImageLoaderModule,
                    DownloadManagerModule,
                    OpenUrlModalModule,
                    RibbonModule,
                    SuperTabsModule,
                    StarRatingModule,
                    PipesModule
                ]
            },] },
];
/** @nocollapse */
ExtIonicModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map
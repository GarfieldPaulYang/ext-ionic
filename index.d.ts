export { Immerse } from './src/native/immerse-plugin';
export { ExtILocalNotification, ExtLocalNotifications } from './src/native/local-notifications';
export { HotCodePushConifg, HotCodePushOptions, HotCodeCallback, HotCodePush } from './src/native/hot-code-push';
export { LoginConfig, Config, ConfigProvider } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { ConsoleErrorHandler } from './src/utils/console-error-handler';
export { HotUpdater } from './src/providers/hot-updater';
export { ComponentRegistar } from './src/providers/component-registar';
export { FileStorage, TextFileStorage } from './src/providers/file-storage/file-storage';
export { JsonFileStorage } from './src/providers/file-storage/json-file-storage';
export { PipesModule } from './src/pipes/pipes.module';
export { AlphaScrollModule } from './src/components/alpha-scroll/alpha-scroll.module';
export { OpenUrlModalModule } from './src/components/open-url-modal/open-url-modal.module';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
export { BaiduMapModule } from './src/components/baidu-map/baidu-map.module';
export { BaiduMapController } from './src/components/baidu-map/baidu-map';
export { GpsPoint, MarkerSize, MarkerInfoWindow, MarkerOptions, PointCollectionOptions, MassOptions, BaiduMapOptions } from './src/components/baidu-map/baidu-map-options';
export { ImageLoaderModule } from './src/components/image-loader/image-loader.module';
export { StarRatingModule } from './src/components/star-rating/star-rating.module';
export { RibbonModule } from './src/components/ribbon/ribbon.module';
export { TabsModule } from './src/components/slide-tabs/tabs.module';
export { DownloadManagerModule } from './src/components/download-manager/download-manager.module';
export { DownloadManagerController, DownloadOptions } from './src/components/download-manager/download-manager';
export { StringUtils } from './src/utils/string';
export { assert, isTrueProperty, isPresent, flattenObject, unFlattenObject } from './src/utils/util';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptionsArgs, HttpInterceptor, HttpProviderOptions, LoginOptions, LoginResult, SubAcount, HttpProvider, CorsHttpProvider, ticket_expired } from './src/providers/http';
import './src/rxjs-extensions';
import { ModuleWithProviders } from '@angular/core';
import { Config } from './src/config/config';
export declare class ExtIonicModule {
    static forRoot(config?: Config): ModuleWithProviders;
}
export declare class ExtIonicLazyModule {
    static forRoot(config?: Config): ModuleWithProviders;
}

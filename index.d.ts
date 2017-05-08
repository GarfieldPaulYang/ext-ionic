export { Immerse } from './src/native/immerse-plugin';
export { ExtILocalNotification, ExtLocalNotifications } from './src/native/local-notifications';
export { HotCodePushConifg, HotCodePushOptions, HotCodeCallback, HotCodePush } from './src/native/hot-code-push';
export { AppLauncher, AppLauncherOptions, ExtraOptions } from './src/native/app-launcher';
export { LoginConfig, Config, ConfigProvider } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { ConsoleErrorHandler } from './src/utils/console-error-handler';
export { HotUpdater } from './src/providers/hot-updater';
export { ComponentRegistar } from './src/providers/component-registar';
export { Storage, SaveOptions, LoadOptions, RemoveOptions } from './src/providers/storage/storage';
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
export * from './src/components/nav-button-bar/nav-button-bar.module';
export { StringUtils } from './src/utils/string';
export { isTrueProperty, isPresent, flattenObject, unFlattenObject } from './src/utils/util';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptionsArgs, HttpProviderOptions, LoginOptions, LoginResult, SubAcount, HttpProvider, CorsHttpProvider, ticket_expired } from './src/providers/http/http';
import './src/rxjs-extensions';
import { ModuleWithProviders } from '@angular/core';
import { Config } from './src/config/config';
export declare class ExtIonicModule {
    static forRoot(config?: Config): ModuleWithProviders;
}
export declare class LazyExtIonicModule {
    static forRoot(config?: Config): ModuleWithProviders;
}

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

export { MapToIterable } from './src/pipes/map-to-iterable';
export { OrderBy } from './src/pipes/order-by';

export { AlphaScrollModule } from './src/components/alpha-scroll/alpha-scroll.module';
export { OpenUrlModalModule } from './src/components/open-url-modal/open-url-modal.module';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { BaiduMapModule } from './src/components/baidu-map/baidu-map.module';
export { BaiduMapController } from './src/components/baidu-map/baidu-map';
export {
  GpsPoint,
  MarkerSize,
  MarkerInfoWindow,
  MarkerOptions,
  PointCollectionOptions,
  MassOptions,
  BaiduMapOptions
} from './src/components/baidu-map/baidu-map-options';

export { ImageLoaderModule } from './src/components/image-loader/image-loader.module';

export { StarRatingModule } from './src/components/star-rating/star-rating.module';
export { RibbonModule } from './src/components/ribbon/ribbon.module';
export { TabsModule } from './src/components/slide-tabs/tabs.module';
export { DownloadManagerModule } from './src/components/download-manager/download-manager.module';
export { DownloadManagerController, DownloadOptions } from './src/components/download-manager/download-manager';

export { StringUtils } from './src/utils/string';
export { assert, isTrueProperty, isPresent, flattenObject, unFlattenObject } from './src/utils/util';
export { Dialog } from './src/utils/dialog';
export {
  HttpProviderOptionsArgs,
  HttpProviderOptions,
  LoginOptions,
  LoginResult,
  SubAcount,
  HttpProvider,
  CorsHttpProvider,
  ticket_expired
} from './src/providers/http';

import './src/rxjs-extensions';

import { Transfer } from '@ionic-native/transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { Device } from '@ionic-native/device';
import { Immerse } from './src/native/immerse-plugin';
import { HotCodePush } from './src/native/hot-code-push';
import { ExtLocalNotifications } from './src/native/local-notifications';

import { NgModule, ModuleWithProviders } from '@angular/core';

import { EXT_IONIC_CONFIG, Config, ConfigProvider, setupConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/providers/http';

import { HotUpdater } from './src/providers/hot-updater';
import { ComponentRegistar } from './src/providers/component-registar';
import { TextFileStorage } from './src/providers/file-storage/file-storage';
import { JsonFileStorage } from './src/providers/file-storage/json-file-storage';

import { MapToIterable } from './src/pipes/map-to-iterable';
import { OrderBy } from './src/pipes/order-by';

import { AlphaScrollModule } from './src/components/alpha-scroll/alpha-scroll.module';
import { OpenUrlModalModule } from './src/components/open-url-modal/open-url-modal.module';
import { BaiduMapModule } from './src/components/baidu-map/baidu-map.module';
import { ImageLoaderModule } from './src/components/image-loader/image-loader.module';
import { StarRatingModule } from './src/components/star-rating/star-rating.module';
import { RibbonModule } from './src/components/ribbon/ribbon.module';
import { TabsModule } from './src/components/slide-tabs/tabs.module';
import { DownloadManagerModule } from './src/components/download-manager/download-manager.module';

const EXPORTS: Array<any> = [
  MapToIterable,
  OrderBy
];

@NgModule({
  imports: [
    AlphaScrollModule.forRoot(),
    BaiduMapModule.forRoot(),
    ImageLoaderModule.forRoot(),
    DownloadManagerModule.forRoot(),
    OpenUrlModalModule.forRoot(),
    RibbonModule.forRoot(),
    TabsModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  exports: [
    AlphaScrollModule,
    BaiduMapModule,
    ImageLoaderModule,
    DownloadManagerModule,
    OpenUrlModalModule,
    RibbonModule,
    TabsModule,
    StarRatingModule,
    EXPORTS
  ],
  declarations: [
    EXPORTS
  ]
})
export class ExtIonicModule {
  static forRoot(config?: Config): ModuleWithProviders {
    return {
      ngModule: ExtIonicModule,
      providers: [
        Transfer,
        File,
        FileOpener,
        Device,

        { provide: EXT_IONIC_CONFIG, useValue: config },
        { provide: ConfigProvider, useFactory: setupConfig, deps: [EXT_IONIC_CONFIG] },
        Dialog,
        HttpProvider,
        CorsHttpProvider,
        MapToIterable,
        OrderBy,
        HotUpdater,
        ComponentRegistar,
        TextFileStorage,
        JsonFileStorage,

        Immerse,
        HotCodePush,
        ExtLocalNotifications
      ]
    };
  }
}

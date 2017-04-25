export { Immerse } from './src/native/immerse-plugin';
export { ExtILocalNotification, ExtLocalNotifications } from './src/native/local-notifications';
export { HotCodePushConifg, HotCodePushOptions, HotCodeCallback, HotCodePush } from './src/native/hot-code-push';

export { LoginConfig, Config, ConfigProvider } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { ConsoleErrorHandler } from './src/utils/console-error-handler';

export { HotUpdater } from './src/providers/hot-updater';
export { ComponentRegistar } from './src/providers/component-registar';

export { Storage } from './src/providers/storage/storage';
export { MemoryStorage } from './src/providers/storage/mem-storage';
export { TextFileStorage } from './src/providers/storage/file-storage';
export { JsonFileStorage } from './src/providers/storage/json-file-storage';

export { PipesModule } from './src/pipes/pipes.module';

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

export { SuperTabsModule } from './src/components/super-tabs/super-tabs.module';
export { SuperTabsConfig } from './src/components/super-tabs/components/super-tabs/super-tabs';
export { SuperTabsController } from './src/components/super-tabs/providers/super-tabs-controller';

export { DownloadManagerModule } from './src/components/download-manager/download-manager.module';
export { DownloadManagerController, DownloadOptions } from './src/components/download-manager/download-manager';

export { StringUtils } from './src/utils/string';
export { isTrueProperty, isPresent, flattenObject, unFlattenObject } from './src/utils/util';
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

const PROVIDERS: Array<any> = [
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

@NgModule({
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
})
export class ExtIonicModule {
  static forRoot(config?: Config): ModuleWithProviders {
    return {
      ngModule: ExtIonicModule,
      providers: [
        { provide: EXT_IONIC_CONFIG, useValue: config },
        { provide: ConfigProvider, useFactory: setupConfig, deps: [EXT_IONIC_CONFIG] },
        PROVIDERS
      ]
    };
  }
}
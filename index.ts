export { Immerse } from './src/native/immerse-plugin';
export { ExtILocalNotification, ExtLocalNotifications } from './src/native/local-notifications';
export { HotCodePushConfig, HotCodePush } from './src/native/hot-code-push';

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

export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { BaiduMap } from './src/components/baidu-map/baidu-map-component';
export {
  GpsPoint,
  MarkerSize,
  MarkerInfoWindow,
  MarkerOptions,
  PointCollectionOptions,
  MassOptions,
  BaiduMapOptions
} from './src/components/baidu-map/baidu-map-options';

export { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
export { ImageLoaderOptions } from './src/components/image-loader/image-loader-options';

export { StarRatingCmp } from './src/components/star-rating/star-rating';
export { Ribbon, RibbnOption } from './src/components/ribbon/ribbon';
export { ProgressBarCmp } from './src/components/progress-bar/progress-bar';


export { StringUtils } from './src/utils/string';
export { assert, isTrueProperty, isPresent } from './src/utils/util';
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

import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { EXT_IONIC_CONFIG, Config, ConfigProvider, setupConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/providers/http';

import { HotUpdater } from './src/providers/hot-updater';
import { ComponentRegistar } from './src/providers/component-registar';
import { TextFileStorage } from './src/providers/file-storage/file-storage';
import { JsonFileStorage } from './src/providers/file-storage/json-file-storage';


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
import { Ribbon } from './src/components/ribbon/ribbon';
import { ProgressBarCmp } from './src/components/progress-bar/progress-bar';

const EXPORTS: Array<any> = [
  MapToIterable,
  OrderBy,
  AlphaScroll,
  BaiduMap,
  ImageLoaderCmp,
  StarRatingCmp,
  Ribbon,
  ProgressBarCmp
];

@NgModule({
  imports: [
    IonicModule
  ],
  exports: EXPORTS,
  declarations: [
    EXPORTS,
    OpenUrlModalCmp
  ],
  entryComponents: [
    OpenUrlModalCmp
  ]
})
export class ExtIonicModule {
  static forRoot(config?: Config): ModuleWithProviders {
    return {
      ngModule: ExtIonicModule,
      providers: [
        { provide: EXT_IONIC_CONFIG, useValue: config },
        { provide: ConfigProvider, useFactory: setupConfig, deps: [EXT_IONIC_CONFIG] },
        OpenUrlModalController,
        BaiduMapController,
        ImageLoaderController,
        Dialog,
        HttpProvider,
        CorsHttpProvider,
        MapToIterable,
        OrderBy,
        HotUpdater,
        ComponentRegistar,
        TextFileStorage,
        JsonFileStorage
      ]
    };
  }
}

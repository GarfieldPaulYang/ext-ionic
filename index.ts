export { Immerse } from './src/native/immerse-plugin';
export { ExtILocalNotification, ExtLocalNotifications } from './src/native/local-notifications';

export { LoginConfig, Config, defaultConfig } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { ConsoleErrorHandler } from './src/utils/console-error-handler';

export { HotUpdater } from './src/providers/hot-updater';

export { MapToIterable } from './src/pipes/map-to-iterable';
export { OrderBy } from './src/pipes/order-by';

export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { BaiduMap } from './src/components/baidu-map/baidu-map-component';
export { GpsPoint, MarkerSize, MarkerInfoWindow, MarkerOptions, PointCollectionOptions, MassOptions, BaiduMapOptions } from './src/components/baidu-map/baidu-map-options';

export { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
export { ImageLoaderOptions } from './src/components/image-loader/image-loader-options';

export { StarRatingCmp } from './src/components/star-rating/star-rating';

export { StringUtils } from './src/utils/string';
export { assert, isTrueProperty, isPresent } from './src/utils/util';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptionsArgs, HttpProviderOptions, LoginOptions, HttpProvider, CorsHttpProvider } from './src/providers/http';

import './src/rxjs-extensions';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import * as _ from 'lodash';

import { EXT_IONIC_CONFIG, Config, defaultConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/providers/http';

import { HotUpdater } from './src/providers/hot-updater';

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
import { ExtLocalNotifications } from './src/native/local-notifications';
import { isTrueProperty } from './src/utils/util';

@NgModule({
  imports: [
    IonicModule
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
})
export class ExtIonicModule {
  static forRoot(config?: Config): ModuleWithProviders {
    return {
      ngModule: ExtIonicModule,
      providers: [
        { provide: EXT_IONIC_CONFIG, useValue: _.isUndefined(config) ? defaultConfig : _.assign({}, defaultConfig, config) },
        OpenUrlModalController,
        BaiduMapController,
        ImageLoaderController,
        Dialog,
        HttpProvider,
        CorsHttpProvider,
        MapToIterable,
        OrderBy,
        HotUpdater
      ]
    };
  }
}
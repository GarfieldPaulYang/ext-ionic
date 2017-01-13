import './src/rxjs-extensions';

import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { isUndefined, assign } from 'lodash';

import { WHCYIT_IONIC_CONFIG, Config, defaultConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/utils/http/http';

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
export class WhcyitModule {
  static forRoot(config?: Config): ModuleWithProviders {
    return {
      ngModule: WhcyitModule,
      providers: [
        { provide: WHCYIT_IONIC_CONFIG, useValue: isUndefined(config) ? defaultConfig : assign({}, defaultConfig, config) },
        OpenUrlModalController,
        BaiduMapController,
        ImageLoaderController,
        Dialog,
        HttpProvider,
        CorsHttpProvider,
        MapToIterable,
        OrderBy
      ]
    };
  }
}
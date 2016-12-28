import './src/rxjs-extensions';

import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from 'ionic-angular';
import { DynamicComponentModuleFactory } from 'angular2-dynamic-component';

import { MapToIterable } from './src/pipes/map-to-iterable';
import { OrderBy } from './src/pipes/order-by';
import { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
import { BaiduMapController } from './src/components/baidu-map/baidu-map';
import { BaiduMap } from './src/components/baidu-map/baidu-map-component';
import { ImageLoaderSpinnerCmp } from './src/components/image-loader/image-loader-spinner-component';
import { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
import { ImageLoaderConfig } from './src/components/image-loader/image-loader-config';
import { ImageLoaderController } from './src/components/image-loader/image-loader';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MapToIterable,
    OrderBy
  ],
  declarations: [
    MapToIterable,
    OrderBy
  ],
  providers: [
    MapToIterable,
    OrderBy
  ]
})
class WhcyitPipeModule { }

@NgModule({
  imports: [
    WhcyitPipeModule,
    IonicModule,
    DynamicComponentModuleFactory.buildModule([IonicModule])
  ],
  exports: [
    WhcyitPipeModule,
    AlphaScroll,
    BaiduMap,
    ImageLoaderCmp
  ],
  declarations: [
    AlphaScroll,
    OpenUrlModalCmp,
    BaiduMap,
    ImageLoaderSpinnerCmp,
    ImageLoaderCmp
  ],
  entryComponents: [
    OpenUrlModalCmp
  ],
  providers: [
    OpenUrlModalController,
    BaiduMapController,
    ImageLoaderController,
    ImageLoaderConfig
  ]
})
export class WhcyitModule { }
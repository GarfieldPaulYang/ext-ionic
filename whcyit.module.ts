import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonicModule } from 'ionic-angular';
import { DynamicComponentModuleFactory } from 'angular2-dynamic-component';

import { MapToIterable } from './src/pipes/map-to-iterable';
import { OrderBy } from './src/pipes/order-by';
import { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { MapToIterable } from './src/pipes/map-to-iterable';
export { OrderBy } from './src/pipes/order-by';
export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

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
    DynamicComponentModuleFactory.buildModule([IonicModule, WhcyitPipeModule])
  ],
  exports: [
    WhcyitPipeModule,
    AlphaScroll
  ],
  declarations: [
    AlphaScroll,
    OpenUrlModalCmp
  ],
  entryComponents: [
    OpenUrlModalCmp
  ],
  providers: [
    OpenUrlModalController
  ]
})
export class WhcyitModule { }
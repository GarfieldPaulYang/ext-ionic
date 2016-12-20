import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DynamicComponentModule } from 'ng-dynamic';

import { MapToIterable } from './src/pipes/map-to-iterable'; 
import { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
export { MapToIterable } from './src/pipes/map-to-iterable';

@NgModule({
  imports: [
    IonicModule,
    DynamicComponentModule.forRoot({
      imports: [IonicModule],
      declarations: [MapToIterable]
    })
  ],
  exports: [
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
export class WhcyitModule {}
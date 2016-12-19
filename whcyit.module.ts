import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';

export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
export { MapToIterable } from './src/pipes/map-to-iterable';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
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
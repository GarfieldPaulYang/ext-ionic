import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { OpenUrlModalCmp } from './components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './components/open-url-modal/open-url-modal';

export { OpenUrlModalController } from './components/open-url-modal/open-url-modal';

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
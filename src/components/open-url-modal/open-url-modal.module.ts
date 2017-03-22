import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OpenUrlModalCmp } from './open-url-modal-component';
import { OpenUrlModalController } from './open-url-modal';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    OpenUrlModalCmp
  ],
  entryComponents: [
    OpenUrlModalCmp
  ]
})
export class OpenUrlModalModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: OpenUrlModalModule,
      providers: [
        OpenUrlModalController
      ]
    };
  }
}
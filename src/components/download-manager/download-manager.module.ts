import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DownloadManagerCmp } from './download-manager-component';
import { DownloadManagerController } from './download-manager';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [
    DownloadManagerCmp
  ],
  exports: [
    DownloadManagerCmp
  ],
  entryComponents: [
    DownloadManagerCmp
  ]
})
export class DownloadManagerModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DownloadManagerModule,
      providers: [
        DownloadManagerController
      ]
    };
  }
}
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FileButton } from './file-button-component';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    FileButton
  ],
  declarations: [
    FileButton
  ]
})
export class FileButtonModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: FileButtonModule, providers: []
    };
  }
}
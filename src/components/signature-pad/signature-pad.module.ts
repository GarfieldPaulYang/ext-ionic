import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SignaturePadCmp } from './signature-pad-component';
import { SignaturePadController } from './signature-pad-controller';

export * from './signature-pad-component';
export * from './signature-pad-controller';
export * from './signature-pad';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    SignaturePadCmp
  ],
  declarations: [
    SignaturePadCmp
  ],
  entryComponents: [
    SignaturePadCmp
  ]
})
export class SignaturePadModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SignaturePadModule,
      providers: [
        SignaturePadController
      ]
    };
  }
}

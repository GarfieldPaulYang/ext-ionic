import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavButtonBar } from './nav-button';

@NgModule({
  imports: [
    IonicModule
  ],
  exports: [
    NavButtonBar
  ],
  declarations: [
    NavButtonBar
  ]
})
export class NavButtonModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavButtonModule, providers: []
    };
  }
}
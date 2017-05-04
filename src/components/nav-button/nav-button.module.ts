import { NgModule, ModuleWithProviders } from '@angular/core';
import { NavButtonBar } from './nav-button';

@NgModule({
  imports: [
    NgModule
  ],
  exports: [
    NavButtonBar
  ],
  declarations: [
    NavButtonBar
  ]
})
export class NavButtonBarModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NavButtonBarModule, providers: []
    };
  }
}
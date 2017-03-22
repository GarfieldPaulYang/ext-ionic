import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Ribbon } from './ribbon';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    Ribbon
  ],
  declarations: [
    Ribbon
  ]
})
export class RibbonModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: RibbonModule, providers: []
    };
  }
}
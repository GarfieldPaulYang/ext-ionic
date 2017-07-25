import { ModuleWithProviders, NgModule } from '@angular/core';
import { ImgFallbackDirective } from './img-src-fallback';

@NgModule({
  exports: [
    ImgFallbackDirective
  ],
  declarations: [
    ImgFallbackDirective
  ]
})
export class ImgFallbackModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ImgFallbackModule, providers: [
      ]
    };
  }
}
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BaiduMapController } from './baidu-map';
import { BaiduMap } from './baidu-map-component';

@NgModule({
  exports: [
    BaiduMap
  ],
  declarations: [
    BaiduMap
  ]
})
export class BaiduMapModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: BaiduMapModule,
      providers: [
        BaiduMapController
      ]
    };
  }
}
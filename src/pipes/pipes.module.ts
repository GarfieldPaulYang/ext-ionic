import { NgModule, ModuleWithProviders } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';

export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';

@NgModule({
  exports: [
    MapToIterable,
    OrderBy
  ],
  declarations: [
    MapToIterable,
    OrderBy
  ]
})
export class PipesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: [
        MapToIterable,
        OrderBy
      ]
    };
  }
}
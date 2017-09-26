import { ModuleWithProviders, NgModule } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';
import { TrustResourceUrl } from './bypass-trust-res-url';
import { TrustMcpUrl } from './bypass-mcp-trust-url';
import { DateFormat } from './date-format';

export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';
export { TrustResourceUrl } from './bypass-trust-res-url';
export { TrustMcpUrl } from './bypass-mcp-trust-url';
export { DateFormat } from './date-format';

@NgModule({
  exports: [
    MapToIterable,
    OrderBy,
    TrustResourceUrl,
    TrustMcpUrl,
    DateFormat
  ],
  declarations: [
    MapToIterable,
    OrderBy,
    TrustResourceUrl,
    TrustMcpUrl,
    DateFormat
  ]
})
export class PipesModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PipesModule,
      providers: [
        MapToIterable,
        OrderBy,
        TrustResourceUrl,
        TrustMcpUrl,
        DateFormat
      ]
    };
  }
}
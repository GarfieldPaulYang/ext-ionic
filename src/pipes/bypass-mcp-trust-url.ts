import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Pipe({
  name: 'trustMcpUrl',
  pure: true
})
@Injectable()
export class TrustMcpUrl implements PipeTransform {
  constructor(private config: ConfigProvider) { }

  transform(value: string, ..._args: any[]): any {
    if (!value) {
      return null;
    }

    const params: string = [
      '__cors-request__=true',
      '__app-key__=' + this.config.get().login.appKey,
      '__dev-mode__=' + this.config.get().devMode,
      '__ticket__=' + this.config.get().ticket
    ].join('&');

    if (value.indexOf('?') === -1) {
      return value + '?' + params;
    }
    return value + '&' + params;
  }
}

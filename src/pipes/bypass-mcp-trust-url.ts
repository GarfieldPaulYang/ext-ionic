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
      'lx-cors-request=true',
      'lx-app-key=' + this.config.get().login.appKey,
      'lx-dev-mode=' + this.config.get().devMode,
      'lx-ticket=' + this.config.get().ticket
    ].join('&');

    if (value.indexOf('?') === -1) {
      return value + '?' + params;
    }
    return value + '&' + params;
  }
}

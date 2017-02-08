import { Injectable, Inject } from '@angular/core';
import {
  Http,
  Request,
  Response,
  RequestOptionsArgs,
  ResponseContentType,
  RequestMethod,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import { Events, Loading } from 'ionic-angular';
import * as _ from 'lodash';

import { EXT_IONIC_CONFIG, Config } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ResponseResult } from '../utils/http/response/response-result';
import { URLParamsBuilder } from '../utils/http/url-params-builder';

const ticket_expired: string = 'ticket_expired';

export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
  showLoading?: boolean;
}

export class HttpProviderOptions extends RequestOptions {
  showLoading: boolean;

  constructor(options: HttpProviderOptionsArgs) {
    super(options);
    this.showLoading = options.showLoading;
  }

  merge(options?: HttpProviderOptionsArgs): HttpProviderOptions {
    let result = <HttpProviderOptions>super.merge(options);
    result.showLoading = options.showLoading;
    return result;
  }
}

const defaultRequestOptions: HttpProviderOptions = new HttpProviderOptions({
  showLoading: true,
  method: RequestMethod.Get,
  responseType: ResponseContentType.Json
});

export interface LoginOptions {
  username: string;
  password: string;
  appId?: string;
  jpushId?: string;
  __login__?: boolean;
}

@Injectable()
export class HttpProvider {
  constructor(
    private _http: Http,
    private dialog: Dialog
  ) { }

  get http(): Http {
    return this._http;
  }

  requestWithError<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.request<T>(url, options).then((result: ResponseResult<T>) => {
        if (result.status === 1) {
          this.dialog.alert('系统提示', result.msg);
          return;
        }
        resolve(result.data);
      }, reason => {
        reject(reason);
      });
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>> {
    options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
    let loading: Loading;
    if (options.showLoading) {
      loading = this.dialog.loading('正在加载...');
      loading.present();
    }
    return new Promise<ResponseResult<T>>((resolve, reject) => {
      this.http.request(url, options).map(
        (r: Response) => new ResponseResult<T>(r.json())
      ).toPromise().then((result: ResponseResult<T>) => {
        if (loading) loading.dismiss();
        resolve(result);
      }, reason => {
        if (loading) loading.dismiss();
        reject(reason);
      }).catch(reason => {
        if (loading) loading.dismiss();
        reject(reason);
      });
    });
  }
}

@Injectable()
export class CorsHttpProvider {
  private _ticket: string;

  constructor(
    private http: HttpProvider,
    private events: Events,
    @Inject(EXT_IONIC_CONFIG) private config: Config
  ) { }

  set ticket(t: string) {
    this._ticket = t;
  }

  login(options: LoginOptions): Promise<string> {
    let search = URLParamsBuilder.build(options);
    search.set('__login__', 'true');
    return this.request<string>(this.config.login.url, { search: search });
  }

  logout() {
    let search = URLParamsBuilder.build({ '__logout__': true });
    return this.request<string>(this.config.login.url, { search: search }).then(result => {
      this._ticket = null;
      return result;
    }, reason => {
      return reason;
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    let search = URLParamsBuilder.build({
      'appKey': this.config.login.appKey,
      'devMode': this.config.devMode,
      '__ticket__': this._ticket,
      '__cors-request__': true
    });

    if (_.isUndefined(options)) {
      options = { showLoading: true };
    }

    if (_.has(options, 'search')) {
      search.setAll(<URLSearchParams>options.search);
    }

    return this.http.requestWithError<T>(
      url, _.assign({}, options, { search: search })
    ).then(result => {
      if (result && _.isString(result) && result.toString() === ticket_expired) {
        this.events.publish(ticket_expired);
        return ticket_expired;
      }
      return result;
    }, reason => {
      return reason;
    });
  }
}
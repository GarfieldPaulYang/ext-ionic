import { Injectable } from '@angular/core';
import {
  Http,
  Request,
  Response,
  RequestOptionsArgs,
  ResponseContentType,
  RequestMethod,
  RequestOptions,
  URLSearchParams,
  Headers
} from '@angular/http';
import { Events, Loading } from 'ionic-angular';
import * as _ from 'lodash';

import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { isPresent } from '../utils/util';
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
}

export interface SubAcount {
  type?: string;
  name?: string;
  password?: string;
}

export interface LoginResult {
  successToken?: string;
  subAccounts?: Array<SubAcount>;
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
          if (isPresent(result.data)) {
            resolve(result.data);
          }
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
    if (options.method === RequestMethod.Post && isPresent(options.body) && !(options.body instanceof FormData)) {
      options.body = _.isString(options.body) ? options.body : JSON.stringify(options.body);
    }

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
  private _ticket: string = null;

  get ticket(): string {
    return this._ticket;
  }

  set ticket(t: string) {
    this._ticket = t;
  }

  constructor(
    private http: HttpProvider,
    private events: Events,
    private config: ConfigProvider
  ) { }

  login(options: LoginOptions): Promise<LoginResult> {
    return this.request<LoginResult>(this.config.get().login.url, {
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      method: RequestMethod.Post,
      body: URLParamsBuilder.build(options).toString(),
      search: URLParamsBuilder.build({ __login__: true })
    });
  }

  logout() {
    let search = URLParamsBuilder.build({ '__logout__': true });
    return this.request<string>(this.config.get().login.url, { search: search }).then(result => {
      this.ticket = null;
      return result;
    }, reason => {
      return reason;
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    let search = URLParamsBuilder.build({
      'appKey': this.config.get().login.appKey,
      'devMode': this.config.get().devMode,
      '__ticket__': this.ticket,
      '__cors-request__': true
    });

    if (_.isUndefined(options)) {
      options = {};
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
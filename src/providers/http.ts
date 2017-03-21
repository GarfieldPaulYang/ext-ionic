import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
import { Device } from '@ionic-native/device';
import * as _ from 'lodash';

import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { isPresent } from '../utils/util';
import { ResponseResult } from '../utils/http/response/response-result';
import { URLParamsBuilder } from '../utils/http/url-params-builder';

export const ticket_expired: string = 'ticket_expired';

export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
  showLoading?: boolean;
  loadingContent?: string;
  showErrorAlert?: boolean;
}

export class HttpProviderOptions extends RequestOptions {
  showLoading: boolean;
  loadingContent: string;
  showErrorAlert: boolean = true;

  constructor(options: HttpProviderOptionsArgs) {
    super(options);
    this.showLoading = options.showLoading;
    this.loadingContent = options.loadingContent;
    this.showErrorAlert = options.showErrorAlert;
  }

  merge(options?: HttpProviderOptionsArgs): HttpProviderOptions {
    let result = <HttpProviderOptions>super.merge(options);
    result.showLoading = this.showLoading;

    if (isPresent(options.showLoading)) {
      result.showLoading = options.showLoading;
    }

    if (isPresent(options.loadingContent)) {
      result.loadingContent = options.loadingContent;
    }

    if (isPresent(options.showErrorAlert)) {
      result.showErrorAlert = options.showErrorAlert;
    }
    return result;
  }
}

const defaultRequestOptions: HttpProviderOptions = new HttpProviderOptions({
  showLoading: true,
  loadingContent: '正在加载...',
  showErrorAlert: true,
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
  constructor(private _http: Http, private dialog: Dialog) { }

  get http(): Http {
    return this._http;
  }

  requestWithError<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    return this.request<T>(url, options).then((result: ResponseResult<T>) => {
      if (result.status === 1) {
        if (options.showErrorAlert) {
          this.dialog.alert('系统提示', result.msg);
        }
        if (isPresent(result.data) && !_.isEqual({}, result.data)) {
          return Promise.reject(result.data);
        }
        return Promise.reject(result.msg);
      }
      return result.data;
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>> {
    options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
    let loading: Loading;
    if (options.showLoading) {
      loading = this.dialog.loading(options.loadingContent);
      loading.present();
    }
    return this.ajax(url, options).toPromise().then(result => {
      if (loading) loading.dismiss();
      return result;
    }).catch(err => {
      if (loading) loading.dismiss();
      return Promise.reject(err);
    });
  }

  ajax<T>(url: string | Request, options?: HttpProviderOptionsArgs): Observable<ResponseResult<T>> {
    if (options.method === RequestMethod.Post && isPresent(options.body) && !(options.body instanceof FormData)) {
      options.body = _.isString(options.body) ? options.body : JSON.stringify(options.body);
    }

    return this.http.request(url, options).map(
      (r: Response) => new ResponseResult<T>(r.json())
    );
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
    private config: ConfigProvider,
    private device: Device
  ) { }

  login(options: LoginOptions): Promise<LoginResult> {
    return this.request<LoginResult>(this.config.get().login.url, {
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      method: RequestMethod.Post,
      body: URLParamsBuilder.build(options).toString(),
      search: URLParamsBuilder.build({ __login__: true, __uuid__: this.device.uuid, __model__: this.device.model })
    });
  }

  logout(): Promise<string> {
    let search = URLParamsBuilder.build({ '__logout__': true });
    return this.request<string>(this.config.get().login.url, { search: search }).then(result => {
      this.ticket = null;
      return result;
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
      search.replaceAll(<URLSearchParams>options.search);
    }

    return this.http.requestWithError<T>(
      url, _.assign({}, options, { search: search })
    ).then(result => {
      return result;
    }).catch(err => {
      if (err && _.isString(err) && err.toString() === ticket_expired) {
        this.events.publish(ticket_expired);
        return Promise.reject(ticket_expired);
      }
    });
  }
}
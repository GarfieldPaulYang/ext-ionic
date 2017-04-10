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

export const ticket_expired: string = 'ticket-expired';

export interface HttpInterceptor {
  before(options: HttpProviderOptionsArgs): void;
  successed(options: HttpProviderOptionsArgs, result: any): void;
  failed(options: HttpProviderOptionsArgs, error: any): void;
}

export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
  showLoading?: boolean;
  loadingContent?: string;
  showErrorAlert?: boolean;
  interceptors?: Array<HttpInterceptor>;
  interceptorParams?: any;
}

export class HttpProviderOptions extends RequestOptions {
  showLoading: boolean;
  loadingContent: string;
  showErrorAlert: boolean = true;
  interceptors: Array<HttpInterceptor> = [];
  interceptorParams: any = {};

  constructor(options: HttpProviderOptionsArgs) {
    super(options);
    this.showLoading = options.showLoading;
    this.loadingContent = options.loadingContent;
    this.showErrorAlert = options.showErrorAlert;
  }

  merge(options?: HttpProviderOptionsArgs): HttpProviderOptions {
    let result = <HttpProviderOptions>super.merge(options);
    result.showLoading = this.showLoading;
    result.showErrorAlert = this.showErrorAlert;
    result.interceptors = this.interceptors;
    result.interceptorParams = this.interceptorParams;

    if (isPresent(options.showLoading)) {
      result.showLoading = options.showLoading;
    }

    if (isPresent(options.loadingContent)) {
      result.loadingContent = options.loadingContent;
    }

    if (isPresent(options.showErrorAlert)) {
      result.showErrorAlert = options.showErrorAlert;
    }

    if (isPresent(options.interceptors)) {
      result.interceptors = options.interceptors;
    }

    if (isPresent(options.interceptorParams)) {
      result.interceptorParams = options.interceptorParams;
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
  constructor(private _http: Http, private config: ConfigProvider, private dialog: Dialog) { }

  get http(): Http {
    return this._http;
  }

  requestWithError<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    if (!isPresent(options.showErrorAlert)) {
      options.showErrorAlert = true;
    }
    return this.request<T>(url, options).then((result: ResponseResult<T>) => {
      if (result.status === 1) {
        if (options.showErrorAlert) {
          this.dialog.alert('系统提示', result.msg);
        }
        if (isPresent(result.data) && !_.isEqual({}, result.data)) {
          return Promise.reject(result);
        }
        return Promise.reject(result.msg);
      }
      return result.data;
    }).catch(err => {
      return Promise.reject(err);
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>> {
    options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
    options.interceptors = this.config.get().interceptors.concat(options.interceptors);
    let loading: Loading;
    if (options.showLoading) {
      loading = this.dialog.loading(options.loadingContent);
      loading.present();
    }
    options.interceptors.forEach(interceptor => {
      interceptor.before(options);
    });
    return this.ajax(url, options).toPromise().then(result => {
      if (loading) loading.dismiss();
      options.interceptors.forEach(interceptor => {
        interceptor.successed(options, result);
      });
      return result;
    }).catch(err => {
      if (loading) loading.dismiss();
      options.interceptors.forEach(interceptor => {
        interceptor.failed(options, err);
      });
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
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        '__login__': 'true',
        '__uuid__': this.device.uuid,
        '__model__': this.device.model
      }),
      method: RequestMethod.Post,
      showErrorAlert: false,
      body: URLParamsBuilder.build(options).toString()
    });
  }

  logout(): Promise<string> {
    return this.request<string>(this.config.get().login.url, {
      headers: new Headers({
        '__logout__': 'true'
      })
    }).then(result => {
      this.ticket = null;
      return result;
    });
  }

  request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T> {
    if (_.isUndefined(options)) {
      options = {};
    }

    if (!isPresent(options.headers)) {
      options.headers = new Headers({
        '__cors-request__': 'true',
        '__app-key__': this.config.get().login.appKey,
        '__dev-mode__': this.config.get().devMode + '',
        '__ticket__': this.ticket
      });
    }

    return this.http.requestWithError<T>(url, options).then(result => {
      return result;
    }).catch(err => {
      if (err && _.isString(err) && err.toString() === ticket_expired) {
        this.events.publish(ticket_expired);
      }
      return Promise.reject(err);
    });
  }
}
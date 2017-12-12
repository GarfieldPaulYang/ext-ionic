import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Events, Loading } from 'ionic-angular';
import { Device } from '@ionic-native/device';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

import { isPresent } from '../../utils/util';
import { StringUtils } from '../../utils/string';
import { URLParamsBuilder } from '../../utils/http/url-params-builder';
import { ResponseResult } from '../../utils/http/response/response-result';
import { Dialog } from '../../utils/dialog';
import { JsonFileStorage } from '../storage/json-file-storage';
import { MemoryStorage } from '../storage/mem-storage';
import { ConfigProvider } from '../../config/config';

export const RequestMethod = {
  Get: 'GET',
  Delete: 'DELETE',
  Head: 'HEAD',
  Jsonp: 'JSONP',
  Options: 'OPTIONS',
  Post: 'POST',
  Put: 'PUT',
  Patch: 'PATCH'
};

function buildParams(params: HttpParams | { [key: string]: any | any[] } | null | string): HttpParams {
  let result = params;
  if (!(params instanceof HttpParams)) {
    if (_.isString(params)) {
      result = new HttpParams({ fromString: params });
    } else {
      result = new HttpParams({ fromObject: params });
    }
  }
  return <HttpParams>result;
}

function buildHeaders(headers: HttpHeaders | { [key: string]: any | any[] } | null | string): HttpHeaders {
  let result = headers;
  if (!(headers instanceof HttpHeaders)) {
    if (_.isObject(headers)) {
      result = new HttpHeaders(_.pickBy(<any>headers, (value) => {
        return isPresent(value);
      }));
    } else {
      result = new HttpHeaders(headers);
    }
  }
  return <HttpHeaders>result;
}

export interface HttpProviderOptionsArgs {
  showLoading?: boolean;
  loadingContent?: string;
  showErrorAlert?: boolean;
  cache?: boolean;
  cacheOnly?: boolean;
  memCache?: boolean;
  maxCacheAge?: number;

  url?: string;
  body?: any | null;
  headers?: HttpHeaders | { [key: string]: any | any[] } | null | string;
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  method?: string;
  params?: HttpParams | { [key: string]: any | any[] } | null | string;
}

export class HttpProviderOptions implements HttpProviderOptionsArgs {
  url: string;
  body: any | null = null;
  headers: HttpHeaders | { [key: string]: any | any[] } | null | string;
  reportProgress: boolean = false;
  withCredentials: boolean = true;
  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' = 'json';
  method: string;
  params: HttpParams | { [key: string]: any | any[] } | null | string;

  showLoading: boolean = true;
  loadingContent: string = '正在加载...';
  showErrorAlert: boolean = true;
  cache: boolean = false;
  cacheOnly: boolean = false;
  memCache: boolean = false;
  maxCacheAge: number = 1000 * 60 * 60 * 6;

  constructor(url: string, method: string = RequestMethod.Get) {
    this.url = url;
    this.method = method;
  }

  merge(options?: HttpProviderOptionsArgs): HttpProviderOptions {
    this.url = isPresent(options.url) ? options.url : this.url;
    this.body = isPresent(options.body) ? options.body : this.body;

    this.headers = buildHeaders(isPresent(options.headers) ? options.headers : this.headers);
    this.reportProgress = isPresent(options.reportProgress) ? options.reportProgress : this.reportProgress;
    this.withCredentials = isPresent(options.withCredentials) ? options.withCredentials : this.withCredentials;
    this.responseType = isPresent(options.responseType) ? options.responseType : this.responseType;
    this.method = isPresent(options.method) ? options.method : this.method;
    this.params = buildParams(isPresent(options.params) ? options.params : this.params);

    this.showLoading = isPresent(options.showLoading) ? options.showLoading : this.showLoading;
    this.showErrorAlert = isPresent(options.showErrorAlert) ? options.showErrorAlert : this.showErrorAlert;
    this.loadingContent = options.loadingContent ? options.loadingContent : this.loadingContent;
    this.cache = isPresent(options.cache) ? options.cache : this.cache;
    this.cacheOnly = isPresent(options.cacheOnly) ? options.cacheOnly : this.cacheOnly;
    this.memCache = isPresent(options.memCache) ? options.memCache : this.memCache;
    this.maxCacheAge = isPresent(options.maxCacheAge) ? options.maxCacheAge : this.maxCacheAge;

    return this;
  }

  build(): HttpRequest<any> {
    return new HttpRequest(this.method, this.url, this.body, {
      headers: <HttpHeaders>this.headers,
      reportProgress: this.reportProgress,
      params: <HttpParams>this.params,
      responseType: this.responseType,
      withCredentials: this.withCredentials
    });
  }
}

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

const APP_JSON_TYPE = 'application/json';
const HTTP_CACHE_DIR = 'whc';

export const ticket_expired: string = 'ticket-expired';

@Injectable()
export class HttpProvider {
  constructor(
    private _http: HttpClient,
    private jsonCache: JsonFileStorage,
    private memCache: MemoryStorage,
    private dialog: Dialog
  ) { }

  get http(): HttpClient {
    return this._http;
  }

  get<T>(url: string,
    options?: HttpProviderOptionsArgs,
    foundCacheCallback: (result: T) => void = (_result: T) => { }
  ): Promise<T> {
    return this.requestWithError<T>(url, options, foundCacheCallback);
  }

  post<T>(url: string, options?: HttpProviderOptionsArgs): Promise<T> {
    options = { ...options, method: RequestMethod.Post };
    return this.requestWithError<T>(url, options);
  }

  requestWithError<T>(
    url: string,
    options?: HttpProviderOptionsArgs,
    foundCacheCallback: (result: T) => void = (_result: T) => { }
  ): Promise<T> {
    let opts: HttpProviderOptions = new HttpProviderOptions(url).merge(options);
    const cache = opts.memCache ? this.memCache : this.jsonCache;

    let innerRequest = (url: string, options?: HttpProviderOptionsArgs): Promise<T> => {
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

        if (options.cache && options.method === RequestMethod.Get && cacheKey) {
          cache.save({ dirname: HTTP_CACHE_DIR, filename: cacheKey, content: result.data });
        }

        return result.data;
      }).catch(err => {
        return Promise.reject(err);
      });
    };

    let cacheKey;
    if (opts.cache && opts.method === RequestMethod.Get) {
      cacheKey = this.hashUrl(url, <HttpParams>opts.params);

      if (opts.cacheOnly) {
        return cache.load<T>(
          { dirname: HTTP_CACHE_DIR, filename: cacheKey, maxAge: opts.maxCacheAge }
        ).catch(() => { return innerRequest(url, opts); });
      }

      cache.load<T>({ dirname: HTTP_CACHE_DIR, filename: cacheKey }).then(result => {
        foundCacheCallback(result);
      }).catch(error => console.log(error));
    }

    return innerRequest(url, opts);
  }

  request<T>(url: string, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>> {
    let opts: HttpProviderOptions = new HttpProviderOptions(url).merge(options);
    let loading: Loading;
    if (opts.showLoading) {
      loading = this.dialog.loading(opts.loadingContent);
      loading.present();
    }
    return this.ajax(url, opts).toPromise().then(result => {
      if (loading) loading.dismiss().catch(() => { });
      if (result.type === HttpEventType.Response) {
        return new ResponseResult<T>((<HttpResponse<any>>result).body);
      }
      return new ResponseResult<T>(null, result);
    }).catch(err => {
      if (loading) loading.dismiss().catch(() => { });
      return Promise.reject(err);
    });
  }

  jsonp<T>(url: string, callbackParam: string = 'callback'): Promise<T> {
    return this.http.jsonp<T>(url, callbackParam).toPromise();
  }

  ajax<T>(url: string, options?: HttpProviderOptionsArgs): Observable<HttpEvent<T>> {
    let opts: HttpProviderOptions = new HttpProviderOptions(url).merge(options);

    if (opts.method === RequestMethod.Post && !(opts.body instanceof FormData)) {
      opts.body = opts.body || {};
      opts.headers = opts.headers || new HttpHeaders({ 'Content-Type': APP_JSON_TYPE });
      if (!(<HttpHeaders>opts.headers).has('Content-Type')) {
        opts.headers = (<HttpHeaders>opts.headers).set('Content-Type', APP_JSON_TYPE);
      }

      if (!_.isString(opts.body)) {
        if (APP_JSON_TYPE === (<HttpHeaders>opts.headers).get('Content-Type').toLowerCase()) {
          opts.body = JSON.stringify(opts.body);
        } else {
          opts.body = URLParamsBuilder.build(opts.body).toString();
        }
      }
    }

    return this.http.request<T>(opts.build());
  }

  private hashUrl(url: string, params: HttpParams): string {
    let q = params ? params.toString() : '';
    return StringUtils.hash(url + q).toString();
  }
}

@Injectable()
export class CorsHttpProvider {
  get httpProvider(): HttpProvider {
    return this.http;
  }

  constructor(
    private http: HttpProvider,
    private events: Events,
    private config: ConfigProvider,
    private device: Device
  ) { }

  login(options: LoginOptions): Promise<LoginResult> {
    return this.post<LoginResult>(this.config.get().login.url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        '__login__': 'true',
        '__uuid__': this.device.uuid,
        '__model__': this.device.model
      },
      showErrorAlert: false,
      body: options
    }).then(result => {
      this.config.set('ticket', result.successToken);
      return result;
    });
  }

  logout(): Promise<string> {
    return this.get<string>(this.config.get().login.url, {
      cache: false,
      headers: {
        '__logout__': 'true'
      }
    }).then(result => {
      this.config.set('ticket', null);
      return result;
    });
  }

  get<T>(url: string,
    options?: HttpProviderOptionsArgs,
    foundCacheCallback: (result: T) => void = (_result: T) => { }
  ): Promise<T> {
    return this.request<T>(url, options, foundCacheCallback);
  }

  post<T>(url: string, options?: HttpProviderOptionsArgs): Promise<T> {
    options = { ...options, method: RequestMethod.Post };
    return this.request<T>(url, options);
  }

  request<T>(
    url: string,
    options?: HttpProviderOptionsArgs,
    foundCacheCallback: (result: T) => void = (_result: T) => { }
  ): Promise<T> {
    options = options || {};
    options.params = buildParams(options.params || new HttpParams()).set('__cors-request__', 'true');
    options.headers = buildHeaders(options.headers || new HttpHeaders()).set('__app-key__', this.config.get().login.appKey)
      .set('__dev-mode__', this.config.get().devMode + '');

    if (this.config.get().ticket) {
      options.headers = (<HttpHeaders>options.headers).set('__ticket__', this.config.get().ticket);
    }

    return this.http.requestWithError<T>(url, options, foundCacheCallback).then(result => {
      return result;
    }).catch(err => {
      if (err && ((_.isString(err) && err.toString() === ticket_expired) ||
        (_.isString(err.data) && err.data.toString() === ticket_expired))) {
        this.events.publish(ticket_expired);
      }
      return Promise.reject(err);
    });
  }
}
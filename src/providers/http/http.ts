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
  headers?: HttpHeaders;
  reportProgress?: boolean;
  withCredentials?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  method?: string;
  params?: HttpParams;
  search?: HttpParams;
}

export class HttpProviderOptions implements HttpProviderOptionsArgs {
  url: string;
  body: any | null = null;
  headers: HttpHeaders = new HttpHeaders();
  reportProgress: boolean = false;
  withCredentials: boolean = true;
  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' = 'json';
  method: string;
  params: HttpParams = new HttpParams();
  search: HttpParams;

  showLoading: boolean = true;
  loadingContent: string = '正在加载...';
  showErrorAlert: boolean = true;
  cache: boolean = false;
  cacheOnly: boolean = false;
  memCache: boolean = false;
  maxCacheAge: number = 1000 * 60 * 60 * 6;

  constructor(url: string, method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' = 'GET') {
    this.url = url;
    this.method = method;
  }

  merge(options?: HttpProviderOptionsArgs): HttpProviderOptions {
    this.url = isPresent(options.url) ? options.url : this.url;
    this.body = isPresent(options.body) ? options.body : this.body;
    this.headers = isPresent(options.headers) ? options.headers : this.headers;
    this.reportProgress = isPresent(options.reportProgress) ? options.reportProgress : this.reportProgress;
    this.withCredentials = isPresent(options.withCredentials) ? options.withCredentials : this.withCredentials;
    this.responseType = isPresent(options.responseType) ? options.responseType : this.responseType;
    this.method = isPresent(options.method) ? options.method : this.method;
    this.params = isPresent(options.params) ? options.params : this.params;
    this.search = isPresent(options.search) ? options.search : this.search;

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
      headers: this.headers,
      reportProgress: this.reportProgress,
      params: this.params || this.search,
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

        if (options.cache && options.method === 'GET' && cacheKey) {
          cache.save({ dirname: HTTP_CACHE_DIR, filename: cacheKey, content: result.data });
        }

        return result.data;
      }).catch(err => {
        return Promise.reject(err);
      });
    };

    let cacheKey;
    if (opts.cache && opts.method === 'GET') {
      cacheKey = this.hashUrl(url, opts.params || opts.search);

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

  jsonp<T>(url: string, callbackParam: string): Promise<T> {
    return this.http.jsonp<T>(url, callbackParam).toPromise();
  }

  ajax<T>(url: string, options?: HttpProviderOptionsArgs): Observable<HttpEvent<T>> {
    let opts: HttpProviderOptions = new HttpProviderOptions(url).merge(options);
    opts.params = opts.params || opts.search;

    if (opts.method === 'POST' && !(opts.body instanceof FormData)) {
      opts.body = opts.body || {};

      let contentType = opts.headers.get('Content-Type');
      if (!contentType) {
        contentType = APP_JSON_TYPE;
        opts.headers.set('Content-Type', contentType);
      }

      if (!_.isString(opts.body)) {
        if (APP_JSON_TYPE === contentType.toLowerCase()) {
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
  private _ticket: string = null;

  get ticket(): string {
    return this._ticket;
  }

  set ticket(t: string) {
    this._ticket = t;
  }

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
    return this.request<LoginResult>(this.config.get().login.url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        '__login__': 'true',
        '__uuid__': this.device.uuid,
        '__model__': this.device.model
      }),
      method: 'POST',
      showErrorAlert: false,
      body: options
    });
  }

  logout(): Promise<string> {
    return this.request<string>(this.config.get().login.url, {
      cache: false,
      headers: new HttpHeaders({
        '__logout__': 'true'
      })
    }).then(result => {
      this.ticket = null;
      return result;
    });
  }

  request<T>(
    url: string,
    options?: HttpProviderOptionsArgs,
    foundCacheCallback: (result: T) => void = (_result: T) => { }
  ): Promise<T> {
    options = options || {};
    options.params = options.params || new HttpParams();
    options.headers = options.headers || new HttpHeaders();

    options.params.set('__cors-request__', 'true');

    options.headers.set('__app-key__', this.config.get().login.appKey);
    options.headers.set('__dev-mode__', this.config.get().devMode + '');
    options.headers.set('__ticket__', this.ticket);

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
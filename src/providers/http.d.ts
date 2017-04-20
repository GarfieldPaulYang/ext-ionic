import { Observable } from 'rxjs';
import { Http, Request, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ResponseResult } from '../utils/http/response/response-result';
import { JsonFileStorage } from './file-storage/json-file-storage';
export declare const ticket_expired: string;
export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
    showLoading?: boolean;
    loadingContent?: string;
    showErrorAlert?: boolean;
    cache?: boolean;
    cacheOnly?: boolean;
}
export declare class HttpProviderOptions extends RequestOptions {
    showLoading: boolean;
    loadingContent: string;
    showErrorAlert: boolean;
    cache: boolean;
    cacheOnly: boolean;
    constructor(options: HttpProviderOptionsArgs);
    merge(options?: HttpProviderOptionsArgs): HttpProviderOptions;
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
export declare class HttpProvider {
    private _http;
    private jsonCache;
    private config;
    private dialog;
    constructor(_http: Http, jsonCache: JsonFileStorage, config: ConfigProvider, dialog: Dialog);
    readonly http: Http;
    requestWithError<T>(url: string, options?: HttpProviderOptionsArgs, foundCacheCallback?: (result: T) => void): Promise<T>;
    request<T>(url: string, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>>;
    ajax<T>(url: string | Request, options?: HttpProviderOptionsArgs): Observable<ResponseResult<T>>;
    private hashUrl(url, params);
}
export declare class CorsHttpProvider {
    private http;
    private events;
    private config;
    private device;
    private _ticket;
    ticket: string;
    readonly httpProvider: HttpProvider;
    constructor(http: HttpProvider, events: Events, config: ConfigProvider, device: Device);
    login(options: LoginOptions): Promise<LoginResult>;
    logout(): Promise<string>;
    request<T>(url: string, options?: HttpProviderOptionsArgs, foundCacheCallback?: (result: T) => void): Promise<T>;
}

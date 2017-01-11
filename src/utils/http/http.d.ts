import { Http, Request, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Config } from '../../config/config';
import { Dialog } from '../dialog';
import { ResponseResult } from './response/response-result';
export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
    showLoading?: boolean;
}
export declare class HttpProviderOptions extends RequestOptions {
    showLoading: boolean;
    constructor(options: HttpProviderOptionsArgs);
    merge(options?: HttpProviderOptionsArgs): HttpProviderOptions;
}
export interface LoginOptions {
    username: string;
    password: string;
    appId?: string;
    jpushId?: string;
    __login__?: boolean;
}
export declare class HttpProvider {
    private _http;
    private dialog;
    constructor(_http: Http, dialog: Dialog);
    readonly http: Http;
    requestWithError<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T>;
    request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>>;
}
export declare class CorsHttpProvider {
    private http;
    private events;
    private config;
    private _ticket;
    constructor(http: HttpProvider, events: Events, config: Config);
    ticket: string;
    login(options: LoginOptions): Promise<string>;
    logout(): Promise<any>;
    request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T>;
}

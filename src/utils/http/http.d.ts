import { Http, Request, RequestOptionsArgs } from '@angular/http';
import { Events } from 'ionic-angular';
import { ConfigManager } from '../../config/config';
import { Dialog } from '../dialog';
import { ResponseResult } from './response/response-result';
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
    requestWithError<T>(url: string | Request, options?: RequestOptionsArgs): Promise<T>;
    request<T>(url: string | Request, options?: RequestOptionsArgs): Promise<ResponseResult<T>>;
}
export declare class CorsHttpProvider {
    private http;
    private events;
    private config;
    private _ticket;
    constructor(http: HttpProvider, events: Events, config: ConfigManager);
    ticket: string;
    login(options: LoginOptions): Promise<string>;
    logout(): Promise<any>;
    request<T>(url: string | Request, options?: RequestOptionsArgs): Promise<T>;
}

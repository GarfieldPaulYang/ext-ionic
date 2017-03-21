import { Observable } from 'rxjs';
import { Http, Request, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ResponseResult } from '../utils/http/response/response-result';
export declare const ticket_expired: string;
export interface HttpProviderOptionsArgs extends RequestOptionsArgs {
    showLoading?: boolean;
    loadingMsg?: string;
    showErrorAlert?: boolean;
}
export declare class HttpProviderOptions extends RequestOptions {
    showLoading: boolean;
    loadingMsg: string;
    showErrorAlert: boolean;
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
    private dialog;
    constructor(_http: Http, dialog: Dialog);
    readonly http: Http;
    requestWithError<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T>;
    request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<ResponseResult<T>>;
    ajax<T>(url: string | Request, options?: HttpProviderOptionsArgs): Observable<ResponseResult<T>>;
}
export declare class CorsHttpProvider {
    private http;
    private events;
    private config;
    private device;
    private _ticket;
    ticket: string;
    constructor(http: HttpProvider, events: Events, config: ConfigProvider, device: Device);
    login(options: LoginOptions): Promise<LoginResult>;
    logout(): Promise<string>;
    request<T>(url: string | Request, options?: HttpProviderOptionsArgs): Promise<T>;
}

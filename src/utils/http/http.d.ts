import { Http, Request, RequestOptionsArgs } from '@angular/http';
import { Dialog } from '../dialog';
import { ResponseResult } from './response/response-result';
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
    constructor(http: HttpProvider);
}

import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs, ResponseContentType, RequestMethod, RequestOptions } from '@angular/http';
import { isUndefined } from 'ionic-angular/util/util';

import { Dialog } from '../dialog';
import { ResponseResult } from './response/response-result';

const defaultRequestOptions: RequestOptions = new RequestOptions({
  method: RequestMethod.Get,
  responseType: ResponseContentType.Json
});

@Injectable()
export class HttpProvider {
  constructor(
    private _http: Http,
    private dialog: Dialog
  ) { }

  get http(): Http {
    return this._http;
  }

  requestWithError<T>(url: string | Request, options?: RequestOptionsArgs): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.request<T>(url, options).then((result: ResponseResult<T>) => {
        if (result.status == 1) {
          this.dialog.alert('系统提示', result.msg);
          return;
        }
        resolve(result.data);
      }).catch(reason => {
        reject(reason);
      });
    });
  }

  request<T>(url: string | Request, options?: RequestOptionsArgs): Promise<ResponseResult<T>> {
    let loading = this.dialog.loading('正在加载...');
    loading.present();

    options = isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
    return new Promise<ResponseResult<T>>((resolve, reject) => {
      this.http.request(url, options).map(
        (r: Response) => new ResponseResult<T>(r.json())
      ).toPromise().then((result: ResponseResult<T>) => {
        loading.dismiss();
        resolve(result)
      }).catch(reason => {
        loading.dismiss();
        reject(reason);
      });
    });
  }
}

@Injectable()
export class CorsHttpProvider {
  constructor(private http: HttpProvider) { }
}
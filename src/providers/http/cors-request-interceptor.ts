import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

import { HttpParamsBuilder } from '../../utils/http/url-params-builder';
import { ResponseResult } from '../../utils/http/response/response-result';

const APP_JSON_TYPE = 'application/json';

@Injectable()
export class CorsRequestInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let body = req.body;
    let headers = req.headers;
    if (req.method === 'POST' && !(req.body instanceof FormData)) {
      let contentType = headers.get('Content-Type');
      if (!contentType) {
        contentType = APP_JSON_TYPE;
        headers.set('Content-Type', contentType);
      }

      if (!_.isString(body)) {
        if (APP_JSON_TYPE === contentType.toLowerCase()) {
          body = JSON.stringify(body);
        } else {
          body = HttpParamsBuilder.build(body).toString();
        }
      }
    }

    const corsReq = req.clone({
      withCredentials: true,
      responseType: 'json',
      headers: headers,
      params: req.params.set('__cors-request__', 'true'),
      body: body
    });
    return next.handle(corsReq).map(event => {
      if (event instanceof HttpResponse) {
        const responseEvent = <HttpResponse<any>>event;
        return responseEvent.clone({
          body: new ResponseResult<any>(responseEvent.body)
        });
      }
      return event;
    });
  }
}
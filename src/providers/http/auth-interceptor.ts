import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigProvider } from '../../config/config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private config: ConfigProvider) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const corsReq = req.clone({
      headers: req.headers.set('__app-key__', this.config.get().login.appKey)
        .set('__dev-mode__', this.config.get().devMode + '')
        .set('__ticket__', this.config.get().ticket)
    });
    return next.handle(corsReq);
  }
}
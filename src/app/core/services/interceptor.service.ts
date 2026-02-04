import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from "@app/services";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers: HttpHeaders = req.headers;
    if (!headers.has('Content-Type')) {
      headers = req.headers.set('Content-Type', 'application/json');
    }
    if (headers.has('uploadFile')) {
      headers = headers.delete('Content-Type').delete('uploadFile');
    }
    const token = this.authService.getToken();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

    let url = `${req.url}`;
    if (!url.startsWith('http')) {
      url = `${environment.endpoint}/${req.url}`;
    }

    const setParams = {};
    if (!environment.production) {
      setParams['XDEBUG_SESSION_START'] = 'PHPSTORM';
    }

    const authReq = req.clone({headers: headers, url: url, setParams: setParams});

    return next.handle(authReq);
  }

}

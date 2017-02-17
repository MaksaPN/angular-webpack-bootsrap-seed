import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Env } from '../../env';
import { Config } from '../../config';

@Injectable()
export class HttpService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions, protected router: Router) {
    super(backend, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('auth_token');
    var requestUrl = typeof url === 'string' ? url : url.url;

    if (token && requestUrl.indexOf(Config.apiUrl) > -1) {
      if (typeof url === 'string') {
        if (!options) {
          options = { headers: new Headers() };
        }
        options.headers.set('Authorization', 'Bearer ' + token);
      }
      else {
        url.headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError(self: HttpService) {
    return (response: Response) => {
      if (response.status === 401) {
        self.logError(response);
        localStorage.clear();
        self.router.navigate(['login']);
      }

      if (response.status === 403) {
        self.logError(response);
      }

      return Observable.throw(response);
    };
  }

  logError(response: Response) {
    if (Env.current == "Development") {
      console.log("Auth error:");
      console.error(response);
    }
  }
}

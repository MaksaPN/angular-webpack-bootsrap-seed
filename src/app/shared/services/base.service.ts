import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Config } from '../../config';
import { Env } from '../../env';

export class BaseService {

  protected apiUrl = Config.apiUrl;

  constructor(protected http: Http) { }

  protected handleError(error: Response | any) {
    let errorMessage: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const errorText = body.error || JSON.stringify(body);
      errorMessage = errorText;
      if (Env.current == "Development") console.error(`${error.status} - ${error.statusText || ''} ${errorText}`);
    }
    else {
      errorMessage = error.message ? error.message : error.toString();
      if (Env.current == "Development") console.error(errorMessage);
    }

    // toaster.error(errorMessage);

    return Observable.throw(errorMessage);
  }

}

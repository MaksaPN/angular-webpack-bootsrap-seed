import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { Config } from '../../config';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class UserService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  get(id: Number): Observable<User> {
    return this.http
      .get(this.apiUrl + 'users/' + id)
      .map((response: Response) => response.json() as User)
      .catch(this.handleError);
  }
}

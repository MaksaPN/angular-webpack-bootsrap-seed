import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UserShortModel, LoginModel, UserLoginModel } from './../models/login';
import { Config } from '../../config';
import { BaseService } from './base.service';

@Injectable()
export class LoginService extends BaseService {

  constructor(http: Http) {
    super(http);
  }

  isUserLoggedIn(): boolean {
    let isUserLoggedIn = !!localStorage.getItem('auth_token');
    return isUserLoggedIn;
  }

  getLoggedUser(): UserShortModel {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  getToken(): string {
    return localStorage.getItem('auth_token');
  }

  setLoggedUser(userModel: LoginModel): void {
    localStorage.setItem('currentUser', JSON.stringify(userModel.user));
    localStorage.setItem('auth_token', JSON.stringify(userModel.token));
  }

  login(user: UserLoginModel): Observable<LoginModel> {
    return this.http
      .post(this.apiUrl + 'users/login', user)
      .map((response: Response) => response.json() as LoginModel)
      .catch(this.handleError);
  }

  logout(): void {
    localStorage.clear();
  }
}

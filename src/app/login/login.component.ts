import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginModel, UserLoginModel } from '../shared/models/login';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  error: string = '';

  @Input()
  user: UserLoginModel = new UserLoginModel();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  login(): void {
    this.loginService.login(this.user).subscribe(
      user => {
        this.loginService.setLoggedUser(user);
        this.router.navigate(['dashboard']);
      },
      error => {
        this.error = error;
      });
  }

  loginTest(): void {
    let testUser: LoginModel = { user: { id: 1, email: 'test@test.test', firstName: 'test', lastName: 'test', role: 'admin' }, token: 'testtest' };
    this.loginService.setLoggedUser(testUser);
    this.router.navigate(['dashboard']);
  }
}

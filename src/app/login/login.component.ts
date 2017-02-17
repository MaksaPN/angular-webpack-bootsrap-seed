import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLoginModel } from '../shared/models/login';
import { LoginService } from '../shared/services/login.service';

import './login.component.scss'

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
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
  };

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
}

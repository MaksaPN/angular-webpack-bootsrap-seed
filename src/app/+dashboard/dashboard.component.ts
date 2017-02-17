import { UserShortModel } from './../shared/models/login';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './../shared/services/login.service';
import { UserService } from './services/user.service';

import './dashboard.component.scss'

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  user: UserShortModel;

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getLoggedUser();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}

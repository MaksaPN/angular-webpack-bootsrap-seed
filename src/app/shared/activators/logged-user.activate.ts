import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './../services/login.service';

@Injectable()
export class LoggedUserCanActivate implements CanActivate {

  constructor(private router: Router, private userService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isUserLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}

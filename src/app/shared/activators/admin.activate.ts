import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './../services/login.service';

@Injectable()
export class AdminCanActivate implements CanActivate {

  constructor(private router: Router, private userService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isUserLoggedIn()) {
      if (this.userService.getLoggedUser().role != 'Admin') {
        this.router.navigate(['login']);
        return false;
      }
    }
    return true;
  }
}

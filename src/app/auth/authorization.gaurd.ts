import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subject, map, takeUntil } from 'rxjs';
import { AuthService } from '../@shared/services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private ngUnsubscribe = new Subject();
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //todo : working, each route should have code assigned
    // return true;
    if(!route.data["code"]){
      return true;
    }
    return this.router.parseUrl("/login");       
    // return this.authService.menuAccess(route.data["code"])
    //   .pipe(takeUntil(this.ngUnsubscribe), map(data => data === false ? this.router.parseUrl("/login") : !!data));
  }
}

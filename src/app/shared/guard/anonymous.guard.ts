import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';

import {AuthService} from '../services';

@Injectable()
export class AnonymousPage implements CanActivateChild {

  constructor(private router: Router, private _auth: AuthService) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this._auth.isAuthenticated) {
        resolve(true);
      } else {
        resolve(false);
        this.router.navigate(['auth']);
      }
    });
  }
}

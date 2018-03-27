import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services';
import { PermissionService } from '../services/permission/permission.service';

@Injectable()
export class CanAuthorized implements CanActivateChild {

  constructor(private router: Router, private _auth: AuthService, private permissionService: PermissionService) {
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this._auth.isAuthenticated) {
        this.router.navigate(['unauth']);
        resolve(false);
      } else {
        // route.data.roles
        if (route.data.roles) {
          if (this.permissionService.checkPermisison({
              include: route.data.roles
            })) {
            resolve(true);
          } else {
            this.router.navigateByUrl('auth');
            resolve(false);
          }
        } else {
          resolve(true);
        }
      }
    });
  }
}

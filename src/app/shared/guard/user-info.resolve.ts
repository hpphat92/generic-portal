import {Injectable, Injector} from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AuthService} from '../services/auth';

@Injectable()
export class UserInfoResolve implements Resolve<any> {
  constructor(private injector: Injector, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    let authService = this.injector.get(AuthService);
    // if (authService.currentUser) {
    //   return true;
    // }
    return new Promise((resolve, reject) => {
      // profileService.profilesGet()
      //   .subscribe(({data}) => {
      //     authService.currentUser = data as UserInfoResModel;
      //     if (!data.partners || !data.partners.length) {
      //       this.router.navigateByUrl('create-bot');
      //       resolve();
      //     } else {
      //       resolve();
      //     }
          resolve();
    //     }, (err) => {
    //       authService.logout()
    //         .then(() => {
    //           this.router.navigateByUrl('unauth');
    //         });
    //       resolve();
    //     });
    });
  }
}

import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/empty';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService,
              private injector: Injector,
              private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    // add a custom header
    let authService = this.injector.get(AuthService);
    return next.handle(request).catch((err, caught) => {
      if (err instanceof HttpErrorResponse) {
        // if (err.status === 401) {
        //   let observer = authService.exchangeExpiredAccessToken().mergeMap(({data}) => {
        //     authService.setToken(data);
        //     const authReq = request.clone({headers: request.headers.set('Authorization', `Bearer ${data.accessToken}`)});
        //     return next.handle(authReq);
        //   });
        //   observer.catch((error, c): any => {
        //     // Refresh token got error
        //     authService.logout()
        //       .then(() => {
        //         this.router.navigateByUrl('unauth');
        //       });
        //   });
        //   return observer;
        // }
        if (err.status === 403) {
          this.router.navigateByUrl('auth');
        }
        if (err.error && err.error.message) {
          this.toastrService.error(err.error.message, 'Error');
        }
        // return Observable.empty<any>();
        // throw err;
        return Observable.throw(err);
        // return Observable.empty<any>();
      }
    });
  }
}

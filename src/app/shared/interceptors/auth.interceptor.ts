import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private anonymousUrl: string[] = ['login', 'signup', 'api/events'];
  private noShowProgress: string[] = ['api/blocks', 'ConversationStatus', 'api/Activities', 'api/Cards', 'api/partner'];

  constructor(private inj: Injector,
              private router: Router,
              private toastrService: ToastrService) {
  }

  private showLoading(auth, req) {
    if (this.noShowProgress.findIndex(i => req.url.toLowerCase().indexOf(i.toLowerCase()) >= 0) < 0) {
      auth.showLoading$.next(true);
    }
  }

  private hideLoading(auth, req) {
    if (this.noShowProgress.findIndex(i => req.url.toLowerCase().indexOf(i.toLowerCase()) >= 0) < 0) {
      auth.showLoading$.next(false);
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.inj.get(AuthService);
    if (this.anonymousUrl.findIndex(i => req.url.toLowerCase().indexOf(i.toLowerCase()) >= 0) < 0) {
      // req.headers.append
      if (!auth.isAuthenticated) {
        // Error
        auth.logout()
          .then(() => {
            // this.toastrService.error('Please Login Again', 'Error');
            this.router.navigateByUrl('unauth');
          });
        return;
      } else {
        let {accessToken} = auth.userToken;
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
            // Authorization: `Bearer <Token>`
          }
        });
      }
    }
    this.showLoading(auth, req);
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event.type === 4) {
        // Success
        this.hideLoading(auth, req);
      }
    }, (err: any) => {
      this.hideLoading(auth, req);
    });
  }
}

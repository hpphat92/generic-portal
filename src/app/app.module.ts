import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import AppConstant from './app.constant';
import { SHARED_SERVICES } from './shared/services';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { UnauthModule } from './unAuth/unauth.module';

const routes: Route[] = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth'},
];
let domain = {
  toString: () => AppConstant.domain,
  valueof: () => AppConstant.domain,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(routes),
    AuthModule,
    UnauthModule,
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [
    ...SHARED_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

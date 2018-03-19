import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {FacebookModule} from 'ngx-facebook';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    FacebookModule.forRoot()
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}

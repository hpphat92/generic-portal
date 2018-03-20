import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}

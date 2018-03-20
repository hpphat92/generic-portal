import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UnAuthComponent } from './unauth.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { RegisterComponent } from './register/register.component';
import { AnonymousPage } from '../shared/guard/guard.module';

const routes: Routes = [
  {
    path: 'unauth',
    component: UnAuthComponent,
    canActivateChild: [AnonymousPage],
    children: [
      {path: 'login', component: LoginComponent, data: {title: 'Login'}},
      {path: 'register', component: RegisterComponent, data: {title: 'Register'}},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: '**', redirectTo: 'login'},
    ],
  },

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    LoginModule,
    RegisterModule
  ],
  declarations: [UnAuthComponent],
})
export class UnauthModule {
}

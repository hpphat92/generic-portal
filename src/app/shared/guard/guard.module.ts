import {NgModule} from '@angular/core';
import {AnonymousPage} from './anonymous.guard';
import {CanAuthorized} from './can-authorized.guard';
import {UserInfoResolve} from './user-info.resolve';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AnonymousPage, CanAuthorized,UserInfoResolve]
})
export class GuardModule {

}

export {
  CanAuthorized,
  AnonymousPage,
  UserInfoResolve,
};

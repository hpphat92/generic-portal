import {NgModule} from '@angular/core';
import {AnonymousPage} from './anonymous.guard';
import {CanAuthorized} from './can-authorized.guard';
import {UserInfoResolve} from './user-info.resolve';
import { PendingChangesGuard } from './can-deactive';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AnonymousPage, CanAuthorized,UserInfoResolve, PendingChangesGuard]
})
export class GuardModule {

}

export {
  CanAuthorized,
  AnonymousPage,
  UserInfoResolve,
  PendingChangesGuard
};

import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule {
}

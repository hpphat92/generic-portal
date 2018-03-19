import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NgUploaderModule} from 'ngx-uploader';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgUploaderModule,
  ],
  entryComponents: [
  ],
  exports: [
    ProfileComponent
  ]
})

export class ProfileModule {
}

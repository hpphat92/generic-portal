import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from "./user-detail/user-detail.component";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgUploaderModule } from 'ngx-uploader';
import { HttpClientModule } from "@angular/common/http";
import { TagInputModule } from 'ngx-chips';
@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent,
  ],
  imports: [
    TagInputModule,
    SharedModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    NgUploaderModule,
    HttpClientModule
  ],
  entryComponents: [],
  exports: [
    UsersComponent,
    UserDetailComponent,
  ]
})

export class UsersModule {
}

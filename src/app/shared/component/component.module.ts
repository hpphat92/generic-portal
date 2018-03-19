import { NgModule } from '@angular/core';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { MaterialModule } from '../material.module';
import { NgUploaderModule } from 'ngx-uploader';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'ngx-loading';
import { DragulaModule } from 'ng2-dragula';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@NgModule({
  declarations: [UserAvatarComponent, ConfirmDialogComponent],
  imports: [
    MaterialModule,
    LoadingModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NgUploaderModule,
    ReactiveFormsModule,
    DragulaModule,
    NgxDnDModule
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [UserAvatarComponent, ConfirmDialogComponent]
})
export class ComponentModule {

}

import { NgModule } from '@angular/core';
import { NgUploaderModule } from 'ngx-uploader';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageUploaderComponent } from './image-uploader.component';
import { MatIconModule } from '@angular/material';


let modules = [
  MatIconModule,
];

@NgModule({
  declarations: [ImageUploaderComponent],
  imports: [
    ...modules,
    CommonModule,
    FormsModule,
    RouterModule,
    NgUploaderModule,
    ReactiveFormsModule,
  ],
  entryComponents: [],
  exports: [ImageUploaderComponent]
})

export class ImageUploaderModule {

}

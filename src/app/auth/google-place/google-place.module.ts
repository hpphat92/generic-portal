import { NgModule } from '@angular/core';
import { GooglePlaceComponent } from './google-place.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceService } from './google-place.service';
import { NgUploaderModule } from 'ngx-uploader';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlaceDetailComponent } from './google-place-detail/google-place-detail.component';
import { RatingModule } from 'ngx-rating';

@NgModule({
  declarations: [
    GooglePlaceComponent,
    GooglePlaceDetailComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgUploaderModule,
    HttpClientModule,
    RatingModule
  ],
  entryComponents: [GooglePlaceDetailComponent],
  providers: [GooglePlaceService],
  exports: [
    GooglePlaceComponent,
  ]
})

export class GooglePlaceModule {
}

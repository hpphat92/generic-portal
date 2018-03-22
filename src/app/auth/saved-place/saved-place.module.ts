import { NgModule } from '@angular/core';
import { SavedPlaceComponent } from './saved-place.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SavedPlaceService } from './saved-place.service';
import { NgUploaderModule } from 'ngx-uploader';
import { HttpClientModule } from '@angular/common/http';
import { SavedPlaceDetailComponent } from './saved-place-detail/saved-place-detail.component';
import { RatingModule } from 'ngx-rating';

@NgModule({
  declarations: [
    SavedPlaceComponent,
    SavedPlaceDetailComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgUploaderModule,
    HttpClientModule,
    RatingModule
  ],
  entryComponents: [SavedPlaceDetailComponent],
  providers: [SavedPlaceService],
  exports: [
    SavedPlaceComponent,
  ]
})

export class SavedPlaceModule {
}

import { NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgUploaderModule } from 'ngx-uploader';
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    EventsComponent,
    EventDetailComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    NgUploaderModule,
    HttpClientModule
  ],
  entryComponents: [],
  exports: [
    EventsComponent,
    EventDetailComponent,
  ]
})

export class EventsModule {
}

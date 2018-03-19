import { Injectable, NgModule } from '@angular/core';
import { EventsComponent } from './events.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { Observable } from "rxjs/Observable";
import { EventsService } from "./events.service";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgUploaderModule } from 'ngx-uploader';
import { HttpClient, HttpClientModule } from "@angular/common/http";

export class EventItem {
  public id: string | number;
  public imageUrl: string;
  public name: string;
  public location: { lat: string | number, lng: string | number };
  public createdDate: Date;
  public updatedDate: Date;
}

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
  providers: [EventsService],
  exports: [
    EventsComponent,
    EventDetailComponent,
  ]
})

export class EventsModule {
}

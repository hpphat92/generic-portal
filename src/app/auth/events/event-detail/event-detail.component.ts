import { Component, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { icon, LatLng, latLng, Marker, marker, tileLayer } from 'leaflet';
import * as iconUrl from 'leaflet/dist/images/marker-icon.png';
import * as shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import * as L from 'leaflet';
import { GeoSearchControl, GoogleProvider } from 'leaflet-geosearch';
import * as _config from '../../../../config.json';
import { EventsService } from '../../../shared/api';
import { BaseForm } from '../../../shared/form';

let config = _config as any;

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent extends BaseForm implements OnDestroy {

  private eventSubscribler: Subscription;
  public map: any;
  public center: LatLng = latLng(46.879966, -121.726909);
  public newMarker: Marker;

  public controlConfig = {
    Id: new FormControl('', []),
    Title: new FormControl('', [Validators.required]),
    ImageUrl: new FormControl('', [Validators.required]),
    IconUrl: new FormControl('', [Validators.required]),
    Latitude: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
    Longitude: new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)]),
    PhoneNumber: new FormControl('', [Validators.required]),
    Website: new FormControl(''),
    Address: new FormControl(''),
    OpeningHours: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
  };
  public formErrors = {
    Title: {} as any,
    ImageUrl: {} as any,
    IconUrl: {} as any,
    Latitude: {} as any,
    Longitude: {} as any,
    PhoneNumber: {} as any,
    Website: {} as any,
    Address: {} as any,
    OpeningHours: {} as any,
    Description: {} as any,
  };
  public layers = [];
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: latLng(46.879966, -121.726909)
  };

  ngOnDestroy(): void {
    this.eventSubscribler && this.eventSubscribler.unsubscribe();
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private eventsService: EventsService,
              private formBuilder: FormBuilder,
              private _ngZone: NgZone) {
    super();
    this.eventSubscribler = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        let id = this.activatedRoute.snapshot.params['id'];
        if (id) {
          this.loadData(id);
        }
      }
    });
  }

  onLocationInputChanged() {
    if (this.frm.controls['Longitude'].invalid || this.frm.controls['Latitude'].invalid) {
      // do no update
      return;
    }
    if (this.map) {
      let { Latitude, Longitude } = this.frm.getRawValue();
      this.setMarkerAtPos(this.map, { lat: Latitude, lng: Longitude });
      this.center = latLng(Latitude || null, Longitude || null);
    }
  }

  mapReady(map: L.Map) {
    this.map = map; // Set for further using
    const provider = new GoogleProvider({
      params: {
        key: config.apiKey.googleApi,
      },
    });
    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,                                   // optional: true|false  - default true
      showPopup: false,                                   // optional: true|false  - default false
      marker: {                                           // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: iconUrl,
          shadowUrl: shadowUrl
        }),
        draggable: false,
      },
      // style: 'bar',
      autoClose: true,
      keepResult: false,
    });
    map.on('geosearch/showlocation', ({ location }: any) => {
      this.setMarkerAtPos(map, { lat: location.y, lng: location.x });
    });
    map.addControl(searchControl);
    map.on('click', (e: any) => {
      if (e.originalEvent.path[0].tagName === 'INPUT' || !e.originalEvent.path[0].className.includes('map')) {
        // Focus on input
        // Work around
        return;
      }
      let { latlng } = e;
      this.setMarkerAtPos(map, latlng);
    })
  }

  public setMarkerAtPos(map, latlng) {
    if (this.newMarker) {
      this.newMarker.setLatLng(latlng);
    } else {
      map.addLayer(this.createMarker(latlng));
    }
    this._ngZone.runOutsideAngular(() => {
      let { lat: Latitude, lng: Longitude } = latlng;
      this.frm.patchValue({ Latitude, Longitude });
      this._ngZone.run(() => {
      });
    });
  }

  public loadData(eventId) {
    this.eventsService.eventsGet(eventId)
      .subscribe(({ Data: data }: any) => {
        this.frm.patchValue(data);
        this.center = latLng(data.Latitude || null, data.Longitude || null);
        this.createMarker({
          lat: data.Latitude,
          lng: data.Longitude
        });
      }, (err) => {

      })
  }

  public createMarker({ lat, lng }) {
    this.newMarker = marker([lat, lng],
      {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: iconUrl,
          shadowUrl: shadowUrl
        }),
        draggable: true
      });
    this.layers.push(this.newMarker);
    this.newMarker.on('dragend', () => {
      let { lat: Latitude, lng: Longitude } = this.newMarker.getLatLng();
      this.frm.patchValue({ Latitude, Longitude });
    });
    return this.newMarker;
  }

  public save() {
    let model = this.frm.getRawValue();
    let subscription;
    if (model.Id) {
      subscription = this.eventsService.eventsUpdate(model.Id, model);
    } else {
      delete model.Id;
      subscription = this.eventsService.eventsCreate(model);
    }
    subscription.subscribe((resp) => {
      this.router.navigate(['auth', 'events']);
    }, (err) => {
    })
  }

  public cancel() {
    this.router.navigate(['auth', 'events']);
  }


  // File
  public uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  public onUploadOutput(output: UploadOutput, file: any, field: string): any {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'https://trabbleclientportalapi.azurewebsites.net/api/files',
          method: 'POST',
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOiIzZjc3MGY3OGM2ODQ0NDFhOTNlYzJmMzNkMTEwOWM4ZSIsIkV4cGlyZWRJblV0YyI6IjIwMTgtMDItMDZUMTI6NTk6MTUuODA0NTY5OVoifQ.Xj34mCYnr1ZG2hhYNm2XDQ64dlYFrv8mdR0m_di45h8' }
        };
        if (file.value) {
          this.uploadInput.emit(event);
        }
        break;
      case 'done':
        this.frm.patchValue({
          [field]: output.file.response.data.url
        });
        break;
    }
  }
}

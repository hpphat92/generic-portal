import { Component, EventEmitter, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import * as _ from 'lodash';
import { Subscription } from "rxjs/Subscription";
import { FormBuilder, Validators } from "@angular/forms";
import { EventsService } from "../events.service";
import { icon, LatLng, latLng, Marker, marker, tileLayer } from "leaflet";
import * as iconUrl from 'leaflet/dist/images/marker-icon.png';
import * as shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { UploadInput, UploadOutput } from "ngx-uploader";
import * as L from 'leaflet';
import { GeoSearchControl, GoogleProvider } from 'leaflet-geosearch';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit, OnDestroy {

  private eventSubscribler: Subscription;
  public eventDetailForm;
  public map: any;
  public center: LatLng = latLng(46.879966, -121.726909);
  public newMarker: Marker;
  public eventDetailErrors = {
    Title: '',
    ImageUrl: '',
    IconUrl: '',
    Latitude: '',
    Longitude: '',
    PhoneNumber: '',
    Website: '',
    Address: '',
    OpeningHours: '',
    Description: '',
  };
  public layers = [];
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
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
    this.eventSubscribler = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        this.loadData(this.activatedRoute.snapshot.params['id']);
      }
    });
    this.eventDetailForm = this.formBuilder.group({
      Id: [''],
      Title: ['', [Validators.required]],
      ImageUrl: ['', [Validators.required]],
      IconUrl: ['', [Validators.required]],
      // IconUrl: ['ABC'],
      Latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      Longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      PhoneNumber: ['', [Validators.required]],
      Website: [''],
      Address: [''],
      OpeningHours: ['', [Validators.required]],
      Description: ['', [Validators.required]],
    });
    this.eventDetailForm.valueChanges.subscribe(() => {
      this.onFormChanged();
    })
  }

  public onFormChanged() {
    for (const field in this.eventDetailErrors) {
      if (!this.eventDetailErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.eventDetailErrors[field] = {};

      // Get the control
      const control = this.eventDetailForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.eventDetailErrors[field] = control.errors;
      }
    }
  }

  public ngOnInit(): void {

  }

  onLocationInputChanged() {
    if (this.eventDetailForm.controls['Longitude'].invalid || this.eventDetailForm.controls['Latitude'].invalid) {
      // do no update
      return;
    }
    if (this.map) {
      let {Latitude, Longitude} = this.eventDetailForm.getRawValue();
      this.setMarkerAtPos(this.map, {lat: Latitude, lng: Longitude});
      this.center = latLng(Latitude || null, Longitude || null);
    }
  }

  mapReady(map: L.Map) {
    this.map = map; // Set for further using
    const provider = new GoogleProvider({
      params: {
        key: 'AIzaSyDwgDKWk0AVwlr06iPXerHz5oQALVasuWo',
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
    map.on('geosearch/showlocation', ({location}: any) => {
      this.setMarkerAtPos(map, {lat: location.y, lng: location.x});
    });
    map.addControl(searchControl);
    map.on('click', (e: any) => {
      if (e.originalEvent.path[0].tagName === 'INPUT' || !e.originalEvent.path[0].className.includes("map")) {
        // Focus on input
        // Work around
        return;
      }
      let {latlng} = e;
      this.setMarkerAtPos(map, latlng);
      // if (this.newMarker) {
      //   this.newMarker.setLatLng(latlng);
      // } else {
      //   map.addLayer(this.createMarker(latlng));
      // }
      // this._ngZone.runOutsideAngular(() => {
      //   let {lat: Latitude, lng: Longitude} = latlng;
      //   this.eventDetailForm.patchValue({Latitude, Longitude});
      //   this._ngZone.run(() => {
      //   });
      // });
    })
  }

  public setMarkerAtPos(map, latlng) {
    if (this.newMarker) {
      this.newMarker.setLatLng(latlng);
    } else {
      map.addLayer(this.createMarker(latlng));
    }
    this._ngZone.runOutsideAngular(() => {
      let {lat: Latitude, lng: Longitude} = latlng;
      this.eventDetailForm.patchValue({Latitude, Longitude});
      this._ngZone.run(() => {
      });
    });
  }

  public loadData(eventId) {
    this.eventsService.getById(eventId)
      .subscribe(({Data: data}: any) => {
        this.eventDetailForm.patchValue(data);
        this.center = latLng(data.Latitude || null, data.Longitude || null);
        this.createMarker({
          lat: data.Latitude,
          lng: data.Longitude
        });
      }, (err) => {

      })
  }

  public createMarker({lat, lng}) {
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
      let {lat: Latitude, lng: Longitude} = this.newMarker.getLatLng();
      this.eventDetailForm.patchValue({Latitude, Longitude});
    });
    return this.newMarker;
  }

  public save() {
    let model = this.eventDetailForm.getRawValue();
    let subscription;
    if (model.Id) {
      subscription = this.eventsService.update(model);
    } else {
      delete model.Id;
      subscription = this.eventsService.create(model);
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
  private uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  public onUploadOutput(output: UploadOutput, file: any, field: string): any {
    switch (output.type) {
      case 'allAddedToQueue':
        // uncomment this if you want to auto upload files when added
        const event: UploadInput = {
          type: 'uploadAll',
          url: 'https://trabbleclientportalapi.azurewebsites.net/api/files',
          method: 'POST',
          headers: {Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySWQiOiIzZjc3MGY3OGM2ODQ0NDFhOTNlYzJmMzNkMTEwOWM4ZSIsIkV4cGlyZWRJblV0YyI6IjIwMTgtMDItMDZUMTI6NTk6MTUuODA0NTY5OVoifQ.Xj34mCYnr1ZG2hhYNm2XDQ64dlYFrv8mdR0m_di45h8'}
        };
        if (file.value) {
          this.uploadInput.emit(event);
        }
        break;
      case 'done':
        this.eventDetailForm.patchValue({
          [field]: output.file.response.data.url
        });
        break;
    }
  }
}

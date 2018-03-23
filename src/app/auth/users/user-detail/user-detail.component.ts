import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserService } from '../../../shared/api';
import { AuthService } from '../../../shared/services/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, Validators } from '@angular/forms';
import { icon, LatLng, latLng, marker, Marker, tileLayer } from 'leaflet';
import { GeoSearchControl, GoogleProvider } from 'leaflet-geosearch';
import * as iconUrl from 'leaflet/dist/images/marker-icon.png';
import * as shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import * as _config from '../../../../config.json';

let config = _config as any;

import * as L from 'leaflet';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public user = {};
  public userForm;
  public userFormErrors: any = {
    firstName: {},
    lastName: {},
    email: {},
    dob: {},
    gender: {},
  };

  constructor(public usersService: UserService,
              public mdDialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private ngZone: NgZone) {
    this.subscription = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        let id = this.activatedRoute.snapshot.params['id'];
        if (id) {
          this.getUserDetail(id);
        }
      }
    });
    this.userForm = this.formBuilder.group({
      profilePictureUrl: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dob: [''],
      gender: [''],
      address: [''],
      occupation: [''],
      bio: [''],
      outsideInterestsAsString: [''],
    });
    this.userForm.valueChanges.subscribe(() => {
      this.onFormChanged();
    })
  }

  ngOnInit(): void {
  }

  public getUserDetail(id) {
    this.usersService.userGetUser(id, '2.0.0', `${this.authService.userToken.accessToken}`)
      .subscribe((resp: any) => {
        this.user = resp;
        resp.outsideInterestsAsString = resp.outsideInterestsAsString ? JSON.parse(resp.outsideInterestsAsString) : [];
        this.userForm.patchValue(resp);
        this.center = latLng(resp.latitude || null, resp.longitude || null);
        this.createMarker({
          lat: resp.latitude,
          lng: resp.longitude
        });
      })
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
  }

  public onFormChanged() {
    for (const field in this.userFormErrors) {
      if (!this.userFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.userFormErrors[field] = {};

      // Get the control
      const control = this.userForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.userFormErrors[field] = control.errors;
      }
    }
  }


  public map: any;
  public center: LatLng = latLng(46.879966, -121.726909);
  public newMarker: Marker;
  public layers = [];
  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 12,
    center: latLng(46.879966, -121.726909)
  };

  public mapReady(map: L.Map) {
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
      this.userForm.patchValue({ Latitude, Longitude });
    });
    return this.newMarker;
  }

  public setMarkerAtPos(map, latlng) {
    if (this.newMarker) {
      this.newMarker.setLatLng(latlng);
    } else {
      map.addLayer(this.createMarker(latlng));
    }
    this.ngZone.runOutsideAngular(() => {
      let { lat: Latitude, lng: Longitude } = latlng;
      this.userForm.patchValue({ Latitude, Longitude });
      this.ngZone.run(() => {
      });
    });
  }

  public save() {
    let model = {
      ...this.user,
      ...this.userForm.getRawValue()
    };
    debugger;
    this.usersService.userPatchUser(model.id, model, '2.0.0', `${this.authService.userToken.accessToken}`)
      .subscribe((resp) => {
        this.router.navigate(['auth', 'users']);
      }, (err) => {
      })
  }

  public cancel() {
    this.router.navigate(['auth', 'users']);
  }
}

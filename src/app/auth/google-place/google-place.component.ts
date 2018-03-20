import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GooglePlaceService } from './google-place.service';
import { MatDialog } from '@angular/material';
import * as placeTypes from './placeType.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDetailComponent } from './google-place-detail/google-place-detail.component';

@Component({
  selector: 'google-place',
  templateUrl: './google-place.component.html',
  styleUrls: ['./google-place.component.scss'],
})
export class GooglePlaceComponent implements OnInit, AfterViewInit {
  public placeTypes = placeTypes;
  public searchForm: FormGroup;
  public places = [];
  public userLocation = {};
  public addressLocation = {};
  public searchFormErrors = {
    Latitude: '',
    Longitude: ''
  };

  constructor(public googlePlaceService: GooglePlaceService,
              public mdDialog: MatDialog,
              public formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      keyword: [''],
      radius: [10, [Validators.required]],
      category: [''],
      options: ['1'],
      Latitude: ['', [Validators.required]],
      Longitude: ['', [Validators.required]]
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.onFormChanged();
    });
    this.gainCurrentLocation()
      .then(({ latitude, longitude }) => {
        this.userLocation = { latitude, longitude };
        this.searchForm.patchValue({
          Latitude: latitude,
          Longitude: longitude
        });
      });
  }

  ngAfterViewInit(): void {

  }

  public onSelectionChanged($event) {
    setTimeout(() => {
      this.initAutocomplete();
    });
  }

  public initAutocomplete() {
    let google = (window as any).google;

    let a = new google.maps.places.SearchBox((document.getElementById('autocomplete')));

    a.addListener('places_changed', (resp) => {
      console.log(a);
      this.addressLocation = {
        latitude: a.getPlaces()[0].geometry.location.lat(),
        longitude: a.getPlaces()[0].geometry.location.lng()
      }
    });
  }

  public onFormChanged() {
    for (const field in this.searchFormErrors) {
      if (!this.searchFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.searchFormErrors[field] = {};

      // Get the control
      const control = this.searchForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.searchFormErrors[field] = control.errors;
      }
    }
  }

  gainCurrentLocation() {

    return new Promise((resolve, reject) => {

      function showPosition(position) {
        resolve(position.coords);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        reject();
      }
    })

  }

  getCurrentLocationFromForm() {
    let formValue = this.searchForm.getRawValue();

    switch (formValue.options) {
      case '1':
        return this.userLocation;
      case '2':
        return { latitude: formValue.Latitude, longitude: formValue.Longitude }
      case '3':
        return this.addressLocation;
    }
  }

  searchPlace() {
    let { latitude, longitude } = this.getCurrentLocationFromForm() as any;
    let { keyword, radius, category } = this.searchForm.getRawValue();
    this.googlePlaceService.search({
      latitude,
      longitude,
      radius,
      type: category,
      keyword
    }).then((resp) => {
      this.places = (resp as any[]).map((o) => {
        o.types = o.types.map((type) => {
          return type.split('_').join(' ').replace(/\b\w/g, function (l) {
            return l.toUpperCase()
          })
        });
        return o;
      });
    }, (err) => {

    })
  }

  ngOnInit(): void {
  }


  changePage(page) {
    console.log(page);
  }

  showModalDetail(row) {
    this.googlePlaceService.getDetail(row.place_id)
      .then((resp) => {
        const dialogRef = this.mdDialog.open(GooglePlaceDetailComponent, {
          data: resp,
          // height: '350px',
          // width: '750px',
        });

      })
  }

}

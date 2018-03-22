import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { GooglePlaceService } from './google-place.service';
import { MatDialog, MatPaginator } from '@angular/material';
import * as placeTypes from './placeType.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDetailComponent } from './google-place-detail/google-place-detail.component';
import * as _ from 'lodash';
import { DataResponseResultBaseDTO, PlacesAdminService, DataResponseResultListBaseDTO } from '../../shared/api';
import { ComponentCanDeactivate } from '../../shared/guard/can-deactive';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { PlaceAdminDTO } from '../../shared/api/model/placeAdminDTO';

@Component({
  selector: 'google-place',
  templateUrl: './google-place.component.html',
  styleUrls: ['./google-place.component.scss'],
})
export class GooglePlaceComponent implements OnInit, AfterViewInit, ComponentCanDeactivate {

  @ViewChildren(MatPaginator)
  public paginators;

  public placeTypes = placeTypes;
  public searchForm: FormGroup;
  public places = [];
  public loading = false;
  public savingCheckingPlaces = false;
  public hasSearch = false;
  public total = 0;
  public pageIndex = 0;
  public userLocation = {};
  public addressLocation = {};
  public searchFormErrors = {
    Latitude: {},
    Longitude: {}
  };
  public pageResults = {
    count: 0,
    placesAtPage: {
      [0]: [],
      [1]: [],
      [2]: []
    },
    reset: function () {
      this.count = 0;
      this.placesAtPage = {
        [0]: [],
        [1]: [],
        [2]: [],
      }
    }
  };
  public listCheckingPlaces = [];
  public listSavedPlaces = [];

  constructor(public googlePlaceService: GooglePlaceService,
              public mdDialog: MatDialog,
              public formBuilder: FormBuilder,
              public placesAdminService: PlacesAdminService) {
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
    this.getSavedPlaces();
  }

  ngAfterViewInit(): void {


  }

  public getSavedPlaces() {
    this.placesAdminService.placesAdminGetAll()
      .subscribe(({ Data: data }: any) => {
        this.listSavedPlaces = data;
      })
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
        return { latitude: formValue.Latitude, longitude: formValue.Longitude };
      case '3':
        return this.addressLocation;
    }
  }

  doSearchForm(model) {
    return new Promise((resolve, reject) => {
      let search = (model, pIndex = 0) => {
        this.googlePlaceService.search(model).then(({ resp, pagination }) => {
          this.pageResults.placesAtPage[pIndex] = (resp as any[]).map((o) => {
            o.types = o.types.map((type) => {
              return type.split('_').join(' ').replace(/\b\w/g, function (l) {
                return l.toUpperCase()
              })
            });
            return o;
          });
          this.pageResults.count += this.pageResults.placesAtPage[pIndex].length;
          if (pagination.hasNextPage) {
            setTimeout(() => {
              model.pageToken = pagination.l;
              search(model, pIndex + 1);
            }, 2000);
          } else {
            resolve();
          }
        }, (err) => {
          reject(err);
        })
      }
      search(model);
    })
  }

  searchPlace() {

    if (!this.confirmChanges()) {
      return;
    }
    this.listCheckingPlaces = [];
    let { latitude, longitude } = this.getCurrentLocationFromForm() as any;
    let { keyword, radius, category } = this.searchForm.getRawValue();
    this.pageResults.reset();
    let nextPageToken = '';
    this.loading = true;
    this.hasSearch = true;
    this.places = [];
    this.pageIndex = 0;
    this.total = 0;
    this.paginators.toArray().forEach((pa) => {
      pa.firstPage();
    });
    this.doSearchForm({
      latitude,
      longitude,
      radius,
      type: category,
      keyword
    }).then(() => {
      this.loading = false;
      this.total = this.pageResults.count;
      this.changePage(0);
    }, () => {
      this.loading = true;
    })
  }

  ngOnInit(): void {
  }

  confirmChanges() {
    if (this.listCheckingPlaces.length) {
      return confirm('WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.');
    }
    return true;
  }

  changePage(page) {
    this.places = _.map(this.pageResults.placesAtPage[page], (place) => {
      if (_.find(this.listSavedPlaces, { PlaceId: place.place_id })) {
        place.isChecked = true;
        place.disableChange = true;
      }
      return place;
    });
  }

  showModalDetail(row) {
    this.googlePlaceService.getDetail(row.place_id)
      .then((resp) => {
        const dialogRef = this.mdDialog.open(GooglePlaceDetailComponent, {
          data: resp,
          width: '400px',
          panelClass: 'place-detail-dlg',
          closeOnNavigation: true,
        });

      })
  }

  toggleCheckbox(e, row) {
    let isChecked = e.currentTarget.checked;
    row.isChecked = isChecked;
    let findIndex = _.findIndex(this.listCheckingPlaces, { id: row.id });
    if (isChecked) {
      this.listCheckingPlaces.push(row);
    } else {
      this.listCheckingPlaces.splice(findIndex, 1);
    }
  }

  saveSelectedCheckingPlaces() {
    let listSubscriptions = _.map(this.listCheckingPlaces, (place) => {
      return new Promise((resolve) => {
        this.googlePlaceService.getDetail(place.place_id).then((placeDetail: any) => {
          this.placesAdminService.placesAdminCreate({
            address: placeDetail.formatted_address,
            categoriesList: place.types.join(','),
            icon: place.icon,
            imageUrl: (placeDetail.photos && placeDetail.photos.length) ? placeDetail.photos[0].getUrl({ maxWidth: 500 }) : '',
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            rating: place.rating,
            name: place.name,
            placeId: place.place_id,
            vicinity: place.vicinity,
          } as PlaceAdminDTO)
            .subscribe(({ Data: data }: any) => {
              this.listSavedPlaces.push(data);
              resolve();
            })
        })
      });
    });
    this.savingCheckingPlaces = true;
    Promise.all(listSubscriptions)
      .then((newPlaces) => {
        this.savingCheckingPlaces = false;
        _.forEach(this.listCheckingPlaces, (place) => {
          place.disableChange = true;
        });
        this.listCheckingPlaces = [];
      });
  }

  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return !this.listCheckingPlaces.length;
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
  }


}

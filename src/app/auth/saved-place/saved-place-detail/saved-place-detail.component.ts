import { Component, ElementRef, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import * as _config from '../../../../config.json';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlacesAdminService } from '../../../shared/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as placeTypes from '../placeType.json';
import { UploadInput, UploadOutput } from 'ngx-uploader';

let config = _config as any;

@Component({
  selector: 'saved-place-detail',
  templateUrl: './saved-place-detail.component.html',
  styleUrls: ['./saved-place-detail.component.scss'],
})
export class SavedPlaceDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public place: any = {};
  public placeCategories: any = [];
  public placeTypes = placeTypes;
  public priceDescription = {
    0: 'Free',
    1: 'Inexpensive',
    2: 'Moderate',
    3: 'Expensive',
    4: 'Very Expensive',
  };

  public placeDetailFrm: FormGroup;
  public placeDetailError = {
    customRating: {},
    customDescription: {},
    customRecommended: {},
    customImageUrl: {},
    customIcon: {},
    customCaregoriesList: {},
  };

  constructor(public placesAdminService: PlacesAdminService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private elementRef: ElementRef,
              private formBuilder: FormBuilder) {
    this.subscription = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        let id = this.activatedRoute.snapshot.params['id'];
        if (id) {
          this.getPlaceDetail(id);
        }
      }
    });
    this.placeDetailFrm = this.formBuilder.group({
      CustomRating: ['', []],
      CustomDescription: ['', []],
      CustomRecommended: ['', []],
      CustomImageUrl: ['', []],
      CustomIcon: ['', []],
      CustomCaregoriesList: ['', []],
    });
    this.placeDetailFrm.valueChanges.subscribe(() => {
      this.onFormChanged();
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  public onFormChanged() {
    for (const field in this.placeDetailError) {
      if (!this.placeDetailError.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.placeDetailError[field] = {};

      // Get the control
      const control = this.placeDetailFrm.get(field);

      if (control && control.dirty && !control.valid) {
        this.placeDetailError[field] = control.errors;
      }
    }
  }

  getPlaceDetail(id) {
    this.placesAdminService.placesAdminGet(id)
      .subscribe(({ Data: data }: any) => {
        let google = (window as any).google;
        this.place = data;
        if (this.place.Latitude && this.place.Longitude) {
          var placeIcon = { lat: this.place.Latitude, lng: this.place.Longitude };
          var map = new google.maps.Map(this.elementRef.nativeElement.querySelector('.map-view'), {
            zoom: 15,
            center: placeIcon
          });
          var marker = new google.maps.Marker({
            position: placeIcon,
            map: map,
            // icon: {
            //   url: this.place.Icon,
            //   size: new google.maps.Size(20, 20),
            // },
          });
        } else {

        }
        this.placeCategories = data.CategoriesList ? data.CategoriesList.split(',').map((ct) => {
          return ct.split('_').join(' ').replace(/\b\w/g, function (l) {
            return l.toUpperCase()
          });
        }) : [];
        this.place.CustomCaregoriesList = this.place.CustomCaregoriesList ? this.place.CustomCaregoriesList.split(',') : [];
        this.placeDetailFrm.patchValue(this.place);
      })
  }

  cancel() {
    this.router.navigate(['auth', 'saved-places']);
  }

  save() {
    let formValue = this.placeDetailFrm.getRawValue();
    formValue.CustomCaregoriesList = formValue.CustomCaregoriesList.length ? formValue.CustomCaregoriesList.join(',') : '';
    formValue.IsUpsert = true;
    formValue.Id = this.place.Id;
    this.placesAdminService.placesAdminCreate(formValue)
      .subscribe((resp) => {
        this.router.navigate(['auth', 'saved-pages'])
      })
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
        this.placeDetailFrm.patchValue({
          [field]: output.file.response.data.url
        });
        break;
    }
  }
}

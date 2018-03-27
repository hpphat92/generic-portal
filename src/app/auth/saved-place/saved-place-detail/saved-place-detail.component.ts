import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as _config from '../../../../config.json';
import { PlacesAdminService } from '../../../shared/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import * as placeTypes from '../placeType.json';
import { BaseForm } from '../../../shared/form';

let config = _config as any;

@Component({
  selector: 'saved-place-detail',
  templateUrl: './saved-place-detail.component.html',
  styleUrls: ['./saved-place-detail.component.scss'],
})
export class SavedPlaceDetailComponent extends BaseForm implements OnInit, OnDestroy {
  private subscription: Subscription;
  public place: any = {};
  public placeCategories: any = [];
  public placeTypes = placeTypes;
  public controlConfig = {
    Id: new FormControl('', []),
    CustomName: new FormControl('', []),
    CustomRating: new FormControl('', []),
    CustomDescription: new FormControl('', []),
    CustomRecommended: new FormControl('', []),
    CustomImageUrl: new FormControl('', []),
    CustomIcon: new FormControl('', []),
    CustomCaregoriesList: new FormControl('', []),
  };
  public frm: FormGroup;
  public formErrors = {
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
    super();
    this.subscription = this.router.events.subscribe((params) => {
      // this.activeBlock = params['blockId'];
      if (params instanceof NavigationEnd) {
        let id = this.activatedRoute.snapshot.params['id'];
        if (id) {
          this.getPlaceDetail(id);
        }
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
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
        this.frm.patchValue(this.place);
      })
  }

  cancel() {
    this.router.navigate(['auth', 'saved-places']);
  }

  save() {
    let formValue = this.frm.getRawValue();
    formValue.CustomCaregoriesList = formValue.CustomCaregoriesList.length ? formValue.CustomCaregoriesList.join(',') : '';
    let model = {
      ...this.place,
      ...formValue
    };
    this.placesAdminService.placesAdminUpdate(formValue.Id, model)
      .subscribe((resp) => {
        this.router.navigate(['auth', 'saved-places']);
      })
  }
}

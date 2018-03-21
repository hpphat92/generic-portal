import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import * as _config from '../../../../config.json';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

let config = _config as any;

@Component({
  selector: 'google-place-detail',
  templateUrl: './google-place-detail.component.html',
  styleUrls: ['./google-place-detail.component.scss'],
})
export class GooglePlaceDetailComponent implements OnInit, OnDestroy {
  public photos;
  public priceDescription = {
    0: 'Free',
    1: 'Inexpensive',
    2: 'Moderate',
    3: 'Expensive',
    4: 'Very Expensive',
  };

  constructor(public dialogRef: MatDialogRef<GooglePlaceDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public place: any) {
    if (this.place.price_level !== undefined) {
      this.place.price_level = this.priceDescription[this.place.price_level];
    }
    this.photos = (this.place.photos && this.place.photos.length) ? this.place.photos.map(p => {
      return p.getUrl({
        maxWidth: 400,
        maxHeight: 250
      })
    }) : []
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  closeModel() {
    this.dialogRef.close();
  }

}

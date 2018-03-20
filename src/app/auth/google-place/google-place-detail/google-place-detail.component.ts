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
  public photo;

  constructor(public dialogRef: MatDialogRef<GooglePlaceDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public place: any) {
    this.photo = this.place.photos && this.place.photos.length ? this.place.photos[0].getUrl({ maxWidth: 340, maxHeight: 500 }) : null;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  closeModel() {
    this.dialogRef.close();
  }

}

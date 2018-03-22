import { Component, OnInit } from '@angular/core';
import { SavedPlaceService } from './saved-place.service';
import { MatDialog } from '@angular/material';
import { SavedPlaceDetailComponent } from './saved-place-detail/saved-place-detail.component';
import { PlacesAdminService } from '../../shared/api';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../../shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'saved-place',
  templateUrl: './saved-place.component.html',
  styleUrls: ['./saved-place.component.scss'],
})
export class SavedPlaceComponent implements OnInit {

  public places: any[] = [];

  constructor(public googlePlaceService: SavedPlaceService,
              public mdDialog: MatDialog,
              public placesAdminService: PlacesAdminService) {

  }

  searchPlace() {
    this.placesAdminService.placesAdminGetAll()
      .subscribe(({ Data: data }: any) => {
        this.places = _.map(data as any[], (place) => {
          place.CategoriesListItems = place.CategoriesList ? place.CategoriesList.split(',').map((ct) => {
            return ct.split('_').join(' ').replace(/\b\w/g, function (l) {
              return l.toUpperCase()
            });
          }) : [];
          return place;
        });

      })
  }

  ngOnInit(): void {
    this.searchPlace();
  }

  showModalDetail(row) {
    this.placesAdminService.placesAdminGet(row.Id)
      .subscribe((resp) => {
        const dialogRef = this.mdDialog.open(SavedPlaceDetailComponent, {
          data: resp,
          width: '400px',
          panelClass: 'place-detail-dlg',
          closeOnNavigation: true,
        });
      })
  }

  deleteSavedPlace(row){
    this.mdDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete Saved Place',
        description: 'Are you sure want to delete this place? This action can\'t be undo?'
      }
    }).afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.placesAdminService.placesAdminDelete(row.Id)
            .subscribe((resp) => {
              this.searchPlace();
            })
        }
      })
  }

}

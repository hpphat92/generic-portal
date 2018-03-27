import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from './generic.service';
import { AuthService } from '../shared/services/auth';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../shared/component/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'generic-list-component',
  templateUrl: './generic-list-component.html',
  styleUrls: ['./generic-list-component.scss']
})
export class GenericListComponent {
  public config: any = {};
  public api;
  public columns = [];
  public rows = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private genericService: GenericService,
              private authService: AuthService,
              public mdDialog: MatDialog,
              private injector: Injector) {
    this.config = this.route.snapshot.data['config'];
    this.columns = this.genericService.getColumns(this.config);
    this.api = this.genericService.getInstance(this.config.moduleName);
    this.loadData();
  }


  loadData() {
    this.api.getList()
      .subscribe((resp) => {
        this.rows = resp.Data || resp.data || resp;
      });
  }

  confirmRemoveRow(row) {
    this.mdDialog.open(ConfirmDialogComponent, {
      data: {
        title: `Confirm delete ${this.config.moduleName}`,
        description: `Are you sure want to delete this ${this.config.moduleName}? This action can\'t be undo?`
      }
    }).afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.api.deleteItem(row.id || row.Id)
            .subscribe((resp) => {
              this.loadData();
            })
        }
      })
  }
}

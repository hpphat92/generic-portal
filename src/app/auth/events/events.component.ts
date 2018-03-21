import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../../shared/component/confirm-dialog/confirm-dialog.component";
import { EventsService } from '../../shared/api';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  public events;

  constructor(public eventsService: EventsService,
              public mdDialog: MatDialog) {
  }

  confirmRemoveRow(row) {
    this.mdDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete Event',
        description: 'Are you sure want to delete this event? This action can\'t be undo?'
      }
    }).afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.eventsService.eventsDelete(row.Id)
            .subscribe((resp) => {
              this.loadData();
            })
        }
      })
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.eventsService.eventsGetAll()
      .subscribe((resp: any) => {
        this.events = resp.Data;
      })
  }
}

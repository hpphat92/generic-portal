import { Component, OnInit } from '@angular/core';
import { EventsService } from "./events.service";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../../shared/component/confirm-dialog/confirm-dialog.component";

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
          this.eventsService.removeById(row.id)
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
    this.eventsService.getEvents()
      .subscribe((resp: any) => {
        this.events = resp.Data;
      })
  }
}

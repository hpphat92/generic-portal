import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../../shared/component/confirm-dialog/confirm-dialog.component";
import { UserService } from '../../shared/api';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users;

  constructor(public usersService: UserService,
              public mdDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    // this.usersService.userGetAllUsers()
    //   .subscribe((resp: any) => {
    //     this.users = resp.Data;
    //   })
  }
}

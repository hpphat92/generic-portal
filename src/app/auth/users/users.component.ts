import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/component/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../shared/api';
import { AuthService } from '../../shared/services/auth';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users = [];

  constructor(public usersService: UserService,
              public mdDialog: MatDialog,
              public authService: AuthService) {
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.usersService.userGetAllUsers('2.0.0', `${this.authService.userToken.accessToken}`)
      .subscribe((resp: any) => {
        this.users = resp;
      })
  }
}

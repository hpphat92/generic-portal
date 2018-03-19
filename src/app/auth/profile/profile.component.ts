import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile = null;

  public profileFormErrors = {
    firstName: {},
    lastName: {},
    email: {}
  };
  public profileForm: FormGroup;

  constructor(private _http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      avatarUrl: [''],
      email: ['', [Validators.required, Validators.email]],
    });
    this.profileForm.patchValue({
      email: this.authService.currentUser.userId
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.onProfileFormChanged();
    });
  }

  public ngOnInit(): void {

  }

  private onProfileFormChanged() {
    for (const field in this.profileFormErrors) {
      if (!this.profileFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.profileFormErrors[field] = {};

      // Get the control
      const control = this.profileForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.profileFormErrors[field] = control.errors;
      }
    }
  }


  public saveProfile() {
    const {firstName, lastName, email, avatarUrl} = this.profileForm.getRawValue();
  }


  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('unauth');
      });
  }
}

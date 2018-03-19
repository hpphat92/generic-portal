import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth';
import AppConstant from '../../app.constant';
import * as _config from '../../../config.json';
import { ToastrService } from "ngx-toastr";

let config = _config as any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  loginForm: FormGroup;
  loginFormErrors: any;
  hideButtonFacebook = false;
  public config = config;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private elementRef: ElementRef,
              private authService: AuthService,
              private toastrService: ToastrService,
              private zone: NgZone) {

    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  ngAfterViewInit() {
  }

  onLoginFormValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  login() {
    const {email, password} = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe((response) => {
      this.onLoginSuccess(response);
    }, () => {
      this.toastrService.error('Invaid email or password', 'Error');
    });
    // let model: LoginModel = {
    //   email, password
    // };
    // this.accountService.accountLogin(model).subscribe((response) => {
    //   this.onLoginSuccess(response.data);
    // }, () => {
    // });
  }

  onLoginSuccess(resp) {
    this.authService.setToken({
      accessToken: resp.authenticationToken,
      userInfo: resp.user
    });
    this.authService.currentUser = resp.user;
    this.zone.run(() => this.router.navigate(['/auth/home']));
    // this.router.navigateByUrl('/auth/notes');
  }

  ngOnDestroy() {
    delete (window as any).FB;
  }
}

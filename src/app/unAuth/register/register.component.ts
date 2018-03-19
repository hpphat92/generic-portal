import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth';
import { RegularExpression } from '../../app.constant';
import { matchOtherValidator } from '../../shared/validators/matcher.validator';
import * as _config from '../../../config.json';
import { ToastrService } from "ngx-toastr";

let config = _config as any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  public config = config;
  registerForm: FormGroup;
  registerFormErrors: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private elementRef: ElementRef,
              private authService: AuthService,
              private toastrService: ToastrService,
              private zone: NgZone) {

    this.registerFormErrors = {
      firstName: {},
      lastName: {},
      email: {},
      password: {},
      passwordConfirm: {}
    };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(RegularExpression.password)]],
      passwordConfirm: ['', [Validators.required, matchOtherValidator('password')
      ]]
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.onRegisterFormValuesChanged();
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onRegisterFormValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (!this.registerFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.registerFormErrors[field] = {};

      // Get the control
      const control = this.registerForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.registerFormErrors[field] = control.errors;
      }
    }
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
  register() {
    const formData = this.registerForm.getRawValue();
    this.authService.signup({
      Email: formData.email,
      Password: formData.password,
    }).subscribe((resp) => {
      this.authService.login(formData.email, formData.password).subscribe((response) => {
        this.onLoginSuccess(response);
      }, () => {
        this.toastrService.error('Invaid email or password', 'Error');
      });
    })
  }
}

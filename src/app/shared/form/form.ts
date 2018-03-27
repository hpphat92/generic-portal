import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'base-form',  // <main-layout-container></main-layout-container>
  // Our list of styles in our component. We may add more to compose many styles together
  encapsulation: ViewEncapsulation.None,
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: '',
})
export class BaseForm implements OnInit {

  public frm: FormGroup = new FormGroup({});
  public formErrors: { [key: string]: any };
  public controlConfig: any;

  public ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.frm = new FormGroup(this.controlConfig);

    this.frm.valueChanges
      .subscribe((data) => this.onValueChanged(this.frm.getRawValue()));

    this.onValueChanged(); // (re)set validation messages now
  }

  public onValueChanged(data?: any) {
    let self = this;

    if (!self.frm) {
      return;
    }
    const form = self.frm;
    for (const field in self.formErrors) {
      if (self.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        self.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          this.formErrors[field] = control.errors;
        }
      }
    }
  }
}

import { FormBuilder, FormGroup } from '@angular/forms';

export class BaseForm {
  public form: FormGroup;
  public formError: any = {};

  public onFormChanged() {
    for (const field in this.form.controls) {
      if (!this.form.controls.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.formError[field] = {};

      // Get the control
      const control = this.form.get(field);

      if (control && control.dirty && !control.valid) {
        this.formError[field] = control.errors;
      }
    }
  }
}

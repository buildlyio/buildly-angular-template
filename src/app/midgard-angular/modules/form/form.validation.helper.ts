import {FormGroup} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormValidationHelper {
  validateForm(form: FormGroup, errorMessages) {
    const errors = {};
    Object.keys(form.value).forEach(controlName => {
      const control = form.get(controlName);
      if (!control.valid && control.dirty) {
        errors[controlName] = errorMessages[controlName];
      } else {
        errors[controlName] = false;
      }
    });
    return errors;
  }
}

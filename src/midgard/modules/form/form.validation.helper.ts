import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
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

/**
 * custom reactive form validator to validate a field with multiple emails separated by commas
 * @param {AbstractControl} control
 * @returns {{[p: string]: any} | null}
 */
export const commaSepEmailValidator = (control: AbstractControl): { [key: string]: any } | null => {
  const emails = control.value.split(',').map(e => e.trim());
  const forbidden = emails.some(email => Validators.email(new FormControl(email)));
  return forbidden ? { 'email': { value: control.value } } : null;
}

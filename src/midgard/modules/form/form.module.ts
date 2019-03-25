import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import {
  FjButtonModule, FjCardModule, FjCheckboxModule, FjNativeDropdownModule, FjRadioButtonModule, FjSpinnerModule,
  FjTextInputModule
} from 'freyja-ui';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FjSpinnerModule,
    ReactiveFormsModule,
    FjCardModule,
    FjButtonModule,
    FjTextInputModule,
    FjCheckboxModule,
    FjNativeDropdownModule,
    FjRadioButtonModule
  ],
  declarations: [
    FormComponent
  ],
  exports: [
    FormComponent
  ]
})
export class MidgardFormModule { }

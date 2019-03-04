import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item.component';
import {
  FjButtonModule, FjInlineTextEditorModule, FjLightBoxModule, FjNativeDropdownModule, FjTextInputModule,
  IconModule
} from 'freyja-ui';

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    FjButtonModule,
    FjLightBoxModule,
    FjTextInputModule,
    FjNativeDropdownModule,
    FjInlineTextEditorModule
  ],
  exports: [
    CardItemComponent
  ],
  declarations: [CardItemComponent]
})
export class MgCardItemModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item.component';

@NgModule({
  imports: [
    CommonModule,
    // IconModule,
    // FjButtonModule,
    // FjLightBoxModule,
    // FjTextInputModule,
    // FjNativeDropdownModule,
    // FjInlineTextEditorModule
  ],
  exports: [
    CardItemComponent
  ],
  declarations: [CardItemComponent]
})
export class MgCardItemModule { }

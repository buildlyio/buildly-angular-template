import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopViewSwitcherComponent} from './top-view-switcher.component';
import {MatIconModule} from '@angular/material';
import {FjButtonModule} from 'freyja-ui';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FjButtonModule
  ],
  declarations: [
    TopViewSwitcherComponent
  ],
  exports: [
    TopViewSwitcherComponent
  ]
})
export class MgTopViewSwitcherModule { }

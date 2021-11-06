import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TopViewSwitcherComponent } from './top-view-switcher.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    TopViewSwitcherComponent,
  ],
  exports: [
    TopViewSwitcherComponent,
  ],
})
export class MgTopViewSwitcherModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidgardAdminComponent } from './midgard-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { MidgardAdminRoutingModule } from './midgard-admin-routing.module';
import { FjButtonModule, FjCardModule, FjTextInputModule } from 'freyja-ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MidgardAdminComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    MidgardAdminRoutingModule,
    ReactiveFormsModule,
    FjCardModule,
    FjButtonModule,
    FjTextInputModule
  ]
})
export class MidgardAdminModule { }

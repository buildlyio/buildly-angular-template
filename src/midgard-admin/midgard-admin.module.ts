import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidgardAdminComponent } from './midgard-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

@NgModule({
  declarations: [MidgardAdminComponent, LoginAdminComponent],
  imports: [
    CommonModule
  ]
})
export class MidgardAdminModule { }

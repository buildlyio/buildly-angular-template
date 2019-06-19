import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidgardAdminComponent } from './midgard-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { MidgardAdminRoutingModule } from './midgard-admin-routing.module';

@NgModule({
  declarations: [MidgardAdminComponent, LoginAdminComponent],
  imports: [
    CommonModule,
    MidgardAdminRoutingModule
  ]
})
export class MidgardAdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidgardAdminComponent } from './midgard-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { MidgardAdminRoutingModule } from './midgard-admin-routing.module';
import { FjButtonModule, FjCardModule, FjTextInputModule } from 'freyja-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MainAdminComponent } from './pages/main-admin/main-admin.component';
import { TopBarAdminComponent } from './layout/top-bar-admin/top-bar-admin.component';
import { NavBarAdminComponent } from './layout/nav-bar-admin/nav-bar-admin.component';
import { NavBarElemAdminComponent } from './layout/nav-bar-admin/navbar-elem-admin/navbar-elem-admin.component';

@NgModule({
  declarations: [
    MidgardAdminComponent,
    LoginAdminComponent,
    MainAdminComponent,
    TopBarAdminComponent,
    NavBarAdminComponent,
    NavBarElemAdminComponent
  ],
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

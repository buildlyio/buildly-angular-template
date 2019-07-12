import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MidgardAdminComponent } from './midgard-admin.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { MidgardAdminRoutingModule } from './midgard-admin-routing.module';
import { FjButtonModule, FjCardModule, FjNativeDropdownModule, FjSpinnerModule, FjTableModule, FjTextInputModule } from 'freyja-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { MainAdminComponent } from './pages/main-admin/main-admin.component';
import { TopBarAdminComponent } from './components/top-bar-admin/top-bar-admin.component';
import { NavBarAdminComponent } from './components/nav-bar-admin/nav-bar-admin.component';
import { NavBarElemAdminComponent } from './components/nav-bar-admin/navbar-elem-admin/navbar-elem-admin.component';
import { EndpointMainComponent } from './components/endpoint-main/endpoint-main.component';
import { MidgardCrudModule } from '../midgard/modules/crud/crud.module';
import { FilterByColumnPropertiesPipe } from './pipes/filter-by-column-properties.pipe';
import { ClickOutsideModule } from 'ng-click-outside';
import { MidgardOAuthModule } from '../midgard/modules/oauth/oauth.module';
import { AdminAuthGuard } from './guards/auth.guard';
import { EndpointEntriesComponent } from './components/endpoint-entries/endpoint-entries.component';
import { EndpointFormComponent } from './components/endpoint-form/endpoint-form.component';
import { EndpointPathsComponent } from './components/endpoint-paths/endpoint-paths.component';
import { MidgardFormModule } from '../midgard/modules/form/form.module';

@NgModule({
  declarations: [
    MidgardAdminComponent,
    LoginAdminComponent,
    MainAdminComponent,
    TopBarAdminComponent,
    NavBarAdminComponent,
    NavBarElemAdminComponent,
    EndpointMainComponent,
    FilterByColumnPropertiesPipe,
    EndpointEntriesComponent,
    EndpointFormComponent,
    EndpointPathsComponent
  ],
  imports: [
    CommonModule,
    MidgardAdminRoutingModule,
    ReactiveFormsModule,
    FjCardModule,
    FjButtonModule,
    FjTextInputModule,
    FjTableModule,
    FjNativeDropdownModule,
    ClickOutsideModule,
    MidgardCrudModule,
    MidgardOAuthModule,
    MidgardFormModule,
    FjSpinnerModule
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class MidgardAdminModule { }

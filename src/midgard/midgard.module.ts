import { NgModule } from '@angular/core';
import { MidgardComponent } from './midgard.component';
import { WorkflowLevel1Component } from './pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from './pages/workflow-level2/list/workflow-level2.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MidgardStoreModule } from './modules/store/store.module';
import { CommonModule } from '@angular/common';
import { MidgardRoutingModule } from './midgard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MidgardCrudModule } from './modules/crud/crud.module';
import { MidgardTranslationModule } from './modules/translation/translation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MidgardOAuthModule } from './modules/oauth/oauth.module';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { AuthGuard } from './modules/oauth/auth.guard';
import { WorkflowLevel2DetailComponent } from './pages/workflow-level2/detail/workflow-level2-detail.component';
import { NavBarElemComponent } from './components/nav-bar/navbar-elem/navbar-elem.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './pages/user/user-management/user-list/user-list.component';
import {
  FjButtonModule, FjCardItemModule, FjCardModule, FjContentSwitcherModule, FjInlineTextEditorModule, FjNativeDropdownModule,
  FjSvgIconModule, FjTableModule,
  FjTextInputModule, FjToggleModule, IconModule
} from 'freyja-ui';
import { ClickOutsideModule } from 'ng-click-outside';
import { FormValidationHelper } from './modules/form/form.validation.helper';
import { SearchBarComponent } from './components/top-bar/search-bar/search-bar.component';
import { MidgardFormModule } from './modules/form/form.module';
import { MidgardHttpModule } from './modules/http/http.module';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { UserGroupsComponent } from './pages/user/user-management/user-groups/user-groups.component';

@NgModule({
  imports: [
    CommonModule,
    MidgardRoutingModule,
    MidgardStoreModule.forRoot(),
    MidgardOAuthModule.forRoot(),
    MidgardHttpModule.forRoot(),
    MidgardTranslationModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MidgardCrudModule,
    MidgardFormModule,
    MatIconModule,
    MatSnackBarModule,
    FjTableModule,
    FjTextInputModule,
    FjButtonModule,
    FjSvgIconModule,
    FjContentSwitcherModule,
    FjNativeDropdownModule,
    FjCardModule,
    FjInlineTextEditorModule,
    FjToggleModule,
    IconModule,
    FjCardItemModule,
    ClickOutsideModule
  ],
  providers: [
    AuthGuard,
    FormValidationHelper
  ],
  declarations: [
    MidgardComponent,
    NavBarComponent,
    NavBarElemComponent,
    WorkflowLevel1Component,
    WorkflowLevel2Component,
    UserComponent,
    LoginComponent,
    TopBarComponent,
    WorkflowLevel2DetailComponent,
    RegisterComponent,
    UserListComponent,
    SearchBarComponent,
    UserManagementComponent,
    UserGroupsComponent
  ],
  exports: [
    MidgardComponent,
    MidgardOAuthModule,
    LoginComponent
  ]
})
export class MidgardModule {
}

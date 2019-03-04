import { NgModule } from '@angular/core';
import { MidgardComponent } from './midgard.component';
import { WorkflowLevel1Component } from '../pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from '../pages/workflow-level2/list/workflow-level2.component';
import { UserComponent } from '../pages/user/user.component';
import { LoginComponent } from '../pages/login/login.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { TopBarComponent } from '../components/top-bar/top-bar.component';
import { MidgardStoreModule } from '../../projects/midgard-angular/src/lib/modules/store/store.module';
import { CommonModule } from '@angular/common';
import { MidgardRoutingModule } from '../../projects/midgard-angular/src/lib/midgard-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MidgardCrudModule } from '../../projects/midgard-angular/src/lib/modules/crud/crud.module';
import { MidgardTranslationModule } from '../../projects/midgard-angular/src/lib/modules/translation/translation.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MidgardOAuthModule } from '../../projects/midgard-angular/src/lib/modules/oauth/oauth.module';
import { MatIconModule } from '@angular/material';
import { AuthGuard } from '../../projects/midgard-angular/src/lib/modules/oauth/auth.guard';
import { WorkflowLevel2DetailComponent } from '../pages/workflow-level2/detail/workflow-level2-detail.component';
import { NavBarElemComponent } from '../../projects/midgard-angular/src/lib/components/nav-bar/navbar-elem/navbar-elem.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from '../pages/user/user-details/user-details.component';
import { UserListComponent } from '../pages/user/user-list/user-list.component';
import { UserInviteComponent } from '../pages/user/user-invite/user-invite.component';
import {
  FjButtonModule, FjCardItemModule, FjCardModule, FjContentSwitcherModule, FjSvgIconModule, FjTableModule,
  FjTextInputModule
} from 'freyja-ui';
import { FormValidationHelper } from '../modules/form/form.validation.helper';
import { SearchBarComponent } from '../components/top-bar/search-bar/search-bar.component';
import { MidgardFormModule } from '../modules/form/form.module';

@NgModule({
  imports: [
    CommonModule,
    MidgardRoutingModule,
    MidgardStoreModule.forRoot(),
    MidgardOAuthModule.forRoot(),
    MidgardTranslationModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MidgardCrudModule,
    MidgardFormModule,
    MatIconModule,
    FjTableModule,
    FjTextInputModule,
    FjButtonModule,
    FjSvgIconModule,
    FjContentSwitcherModule,
    FjCardModule,
    FjCardItemModule
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
    UserDetailsComponent,
    UserListComponent,
    UserInviteComponent,
    SearchBarComponent
  ],
  exports: [
    MidgardComponent,
    MidgardOAuthModule,
    LoginComponent
  ]
})
export class MidgardModule {
}

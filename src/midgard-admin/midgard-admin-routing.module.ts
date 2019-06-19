import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkflowLevel1Component } from './pages/workflow-level1/workflow-level1.component';
import { MidgardComponent } from './midgard.component';
import { AuthGuard } from './modules/oauth/auth.guard';
import { WorkflowLevel2Component } from './pages/workflow-level2/list/workflow-level2.component';
import { WorkflowLevel2DetailComponent } from './pages/workflow-level2/detail/workflow-level2-detail.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user/user-management/user-list/user-list.component';
import { UserManagementComponent } from './pages/user/user-management/user-management.component';
import { UserGroupsComponent } from './pages/user/user-management/user-groups/user-groups.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

const midgardRoutes: Routes = [
  { path: '', component: LoginAdminComponent },
  { path: 'login', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(midgardRoutes)],
  exports: [RouterModule]
})
export class MidgardRoutingModule {}

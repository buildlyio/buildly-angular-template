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

const midgardRoutes: Routes = [
  {
    path: '', component: MidgardComponent, children: [
      {path: 'workflow-level1', component: WorkflowLevel1Component, canActivate: [AuthGuard]},
      {path: 'workflow-level2', component: WorkflowLevel2Component, canActivate: [AuthGuard]},
      {path: 'workflow-level2/details/:parent/:id', component: WorkflowLevel2DetailComponent, canActivate: [AuthGuard], children: [
          {path: 'main', component: WorkflowLevel2DetailComponent}
      ]},
      {path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
          {path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard], children : [
              {path: 'list', component: UserListComponent, canActivate: [AuthGuard]},
              {path: 'groups', component: UserGroupsComponent, canActivate: [AuthGuard]}
            ]},
        ]},
      {path: 'products', loadChildren: '@clients/products/src/lib/products.module#ProductsModule'},
      {path: 'locations', loadChildren: '@clients/locations/src/lib/locations.module#LocationsModule'},
      {path: 'blueprint-client', loadChildren: '@clients/blueprint-client/src/lib/blueprint-client.module#BlueprintClientModule'},
      {path: 'documents', loadChildren: '@clients/documents/src/lib/documents.module#DocumentsModule'},
      {path: 'contacts', loadChildren: '@clients/contacts/src/lib/contacts.module#ContactsModule'}
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(midgardRoutes)],
  exports: [RouterModule]
})
export class MidgardRoutingModule {}

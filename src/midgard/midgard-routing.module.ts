import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WorkflowLevel1Component } from './pages/workflow-level1/workflow-level1.component';
import { MidgardComponent } from './midgard.component';
import { AuthGuard } from './modules/oauth/auth.guard';
import { WorkflowLevel2Component } from './pages/workflow-level2/list/workflow-level2.component';
import { WorkflowLevel2DetailComponent } from './pages/workflow-level2/detail/workflow-level2-detail.component';
import { UserComponent } from './pages/user/user.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';

const midgardRoutes: Routes = [
  {
    path: '', component: MidgardComponent, children: [
      {path: 'workflow-level1', component: WorkflowLevel1Component, canActivate: [AuthGuard]},
      {path: 'workflow-level2', component: WorkflowLevel2Component, canActivate: [AuthGuard]},
      {path: 'workflow-level2/details/:parent/:id', component: WorkflowLevel2DetailComponent, canActivate: [AuthGuard], children: [
          {path: 'main', component: WorkflowLevel2DetailComponent}
      ]},
      {path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
          {path: 'list', component: UserListComponent, canActivate: [AuthGuard]},
          {path: 'details/:id', component: UserDetailsComponent, canActivate: [AuthGuard]},
        ]},
      {path: 'dashboards', loadChildren: '@clients/dashboards/src/lib/dashboards.module#DashboardsModule'},
      {path: 'products', loadChildren: '@clients/products/src/lib/products.module#ProductsModule'},
      {path: 'contacts', loadChildren: '@clients/contacts/src/lib/contacts.module#ContactsModule'},
      {path: 'documents', loadChildren: '@clients/documents/src/lib/documents.module#DocumentsModule'},
      {path: 'forms', loadChildren: '@clients/forms/src/lib/forms.module#FormsModule'}
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(midgardRoutes)],
  exports: [RouterModule]
})
export class MidgardRoutingModule {}

import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MidgardComponent } from '../../projects/midgard-angular/src/lib/midgard.component';
import { WorkflowLevel1Component } from '../../projects/midgard-angular/src/lib/pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from '../../projects/midgard-angular/src/lib/pages/workflow-level2/list/workflow-level2.component';
import { UserComponent } from '../../projects/midgard-angular/src/lib/pages/user/user.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../../projects/midgard-angular/src/lib/modules/oauth/auth.guard';
import { WorkflowLevel2DetailComponent } from '../../projects/midgard-angular/src/lib/pages/workflow-level2/detail/workflow-level2-detail.component';
import { UserDetailsComponent } from '../../projects/midgard-angular/src/lib/pages/user/user-details/user-details.component';
import { UserListComponent } from '../../projects/midgard-angular/src/lib/pages/user/user-list/user-list.component';

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
      {path: 'products', loadChildren: '@libs/products/src/lib/products.module#ProductsModule'},
      {path: 'contacts', loadChildren: '@libs/contacts/src/lib/contacts.module#ContactsModule'},
      {path: 'documents', loadChildren: '@libs/documents/src/lib/documents.module#DocumentsModule'},
      {path: 'dashboards', loadChildren: '@libs/dashboards/src/lib/dashboards.module#DashboardsModule'},
      {path: 'forms', loadChildren: '@libs/forms/src/lib/forms.module#FormsModule'}
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(midgardRoutes)],
  exports: [RouterModule]
})
export class MidgardRoutingModule {}

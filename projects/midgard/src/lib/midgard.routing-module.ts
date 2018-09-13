import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MidgardComponent } from '@libs/midgard/src/lib/midgard.component';
import { LoginComponent } from '@libs/midgard/src/lib/pages/login/login.component';
import { WorkflowLevel1Component } from '@libs/midgard/src/lib/pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from '@libs/midgard/src/lib/pages/workflow-level2/workflow-level2.component';
import { UserComponent } from '@libs/midgard/src/lib/pages/user/user.component';

const midgardRoutes: Routes = [
  {
    path: '', component: MidgardComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'workflow-level1', component: WorkflowLevel1Component},
      {path: 'workflow-level2', component: WorkflowLevel2Component},
      {path: 'user', component: UserComponent},
    ],
  }
];

export const MidgardRoutingModule = RouterModule.forRoot(midgardRoutes);

import { NgModule } from '@angular/core';
import { MidgardComponent } from './midgard.component';
import { MidgardRoutingModule } from '@libs/midgard/src/lib/midgard.routing-module';
import { WorkflowLevel1Component } from './pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from './pages/workflow-level2/workflow-level2.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MigardStoreModule } from '@libs/midgard/src/lib/store-module/store.module';

@NgModule({
  imports: [
    MidgardRoutingModule,
    MigardStoreModule.forRoot()
  ],
  declarations: [
      MidgardComponent,
      WorkflowLevel1Component,
      WorkflowLevel2Component,
      UserComponent,
      LoginComponent,
      NavBarComponent,
      TopBarComponent
  ],
  exports: [MidgardComponent]
})
export class MidgardModule {}

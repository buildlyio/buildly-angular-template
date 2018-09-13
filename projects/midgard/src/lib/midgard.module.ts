import { NgModule } from '@angular/core';
import { MidgardComponent } from './midgard.component';
import { MidgardRoutingModule } from '@libs/midgard/src/lib/midgard.routing-module';
import { WorkflowLevel1Component } from './pages/workflow-level1/workflow-level1.component';
import { WorkflowLevel2Component } from './pages/workflow-level2/workflow-level2.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import core from 'midgard-core';
import { midgardReducer } from '@libs/midgard/src/lib/state/midgard.reducer';
import { loadWorkflowLevel1Data } from '@libs/midgard/src/lib/state/midgard.actions';

@NgModule({
  imports: [
    MidgardRoutingModule,
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
export class MidgardModule {
  constructor() {
    const store = core.configureStore(midgardReducer); // configure redux in the store with our reducers
    console.log(store.getState());
    store.dispatch(loadWorkflowLevel1Data([{id: 1 , name: 'best program', }]));
    console.log(store.getState()); // yay state is changed
  }

}

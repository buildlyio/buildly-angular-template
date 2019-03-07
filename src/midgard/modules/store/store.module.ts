import { NgModule  } from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ProductsEpics } from '@clients/products/src/lib/state/products.epics.ts';
import { AuthUserEpics } from '../../state/authuser/authuser.epics';
import { CoreUserEpics } from '../../state/coreuser/coreuser.epics';
import { WorkflowTeamEpics } from '../../state/workflow-team/workflow-team.epics';


@NgModule({})
export class MidgardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardStoreModule,
      providers: [
        AuthUserEpics,
        CoreUserEpics,
        WorkflowTeamEpics,
        ProductsEpics,
        Store,
      ]
    };
  }
}

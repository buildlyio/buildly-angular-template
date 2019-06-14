import { NgModule  } from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthUserEpics } from '../../state/authuser/authuser.epics';
import { CoreUserEpics } from '../../state/coreuser/coreuser.epics';
import { WorkflowTeamEpics } from '../../state/workflow-team/workflow-team.epics';
import { WorkflowLevel1Epics } from '../../state/workflow-level1/workflow-level1.epics';
import { WorkflowLevel2Epics } from '../../state/workflow-level2/workflow-level2.epics';
import { DashboardsEpics } from '@clients/dashboards/src/lib/state/dashboards.epics';
import { CoreGroupEpics } from '../../state/coregroup/coregroup.epics';
import { CrudEpics } from '../crud/redux/crud.epics';

@NgModule(
  {
    providers: [
      CrudEpics,
      AuthUserEpics,
      CoreUserEpics,
      CoreGroupEpics,
      WorkflowTeamEpics,
      WorkflowLevel1Epics,
      WorkflowLevel2Epics,
      DashboardsEpics,
      ProductsEpics,
      DocumentsEpics,
      LocationsEpics,
      BlueprintClientEpics,
      ContactsEpics
    ]
  })
export class MidgardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardStoreModule,
      providers: [
        Store
      ]
    };
  }
}

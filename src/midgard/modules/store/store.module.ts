import { NgModule  } from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthUserEpics } from '../../state/authuser/authuser.epics';
import { CoreUserEpics } from '../../state/coreuser/coreuser.epics';
import { WorkflowTeamEpics } from '../../state/workflow-team/workflow-team.epics';
import { WorkflowLevel1Epics } from '../../state/workflow-level1/workflow-level1.epics';
import { WorkflowLevel2Epics } from '../../state/workflow-level2/workflow-level2.epics';
import { DashboardsEpics } from '@clients/dashboards/src/lib/state/dashboards.epics';
import { ProductsEpics } from '@clients/products/src/lib/state/products.epics';
import { DocumentsEpics } from '@clients/documents/src/lib/state/documents.epics';
import { LocationsEpics } from '@clients/locations/src/lib/state/locations.epics';
import { BlueprintClientEpics } from '@clients/blueprint-client/src/lib/state/blueprint-client.epics';
import { ContactsEpics } from '@clients/contacts/src/lib/state/contacts.epics';
import { CoreGroupEpics } from '../../state/coregroup/coregroup.epics';

@NgModule({  providers: [DashboardsEpics, ProductsEpics, DocumentsEpics, LocationsEpics, BlueprintClientEpics, ContactsEpics] })
export class MidgardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardStoreModule,
      providers: [
        Store,
        AuthUserEpics,
        CoreUserEpics,
        CoreGroupEpics,
        WorkflowTeamEpics,
        WorkflowLevel1Epics,
        WorkflowLevel2Epics
      ]
    };
  }
}

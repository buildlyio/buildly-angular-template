import { NgModule, ModuleWithProviders  } from '@angular/core';
import { StoreService } from 'projects/midgard/src/lib/modules/store-module/store.service';
import { midgardReducer } from 'projects/midgard/src/lib/state/midgard.reducer';
import { loadWorkflowLevel1DataEpic } from '@libs/midgard/src/lib/state/midgard.epics';
import { combineEpics } from 'redux-observable';
import { redux } from 'midgard-core';


@NgModule({})
export class MigardStoreModule {
  constructor(private storeService: StoreService) {
    const reducers = {
      midgardReducer
      // add othe modules reducers here
    };
    const combinedReducers = redux.combineReducers(reducers); // combine the reducers to one reducer that can be used when creating the store
    const combinedEpics = combineEpics(
      loadWorkflowLevel1DataEpic
      // add other  epics here
    ); // combine redux-observable epics

    storeService.configureStore(combinedReducers, combinedEpics); // configure redux in the store with our reducer and intial values
  }
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MigardStoreModule,
      providers: [
        StoreService,
      ]
    };
  }
}

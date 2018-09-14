import { NgModule, ModuleWithProviders  } from '@angular/core';
import { StoreService } from '@libs/midgard/src/lib/store-module/store.service';
import { midgardReducer } from '@libs/midgard/src/lib/state/midgard.reducer';

@NgModule({})
export class MigardStoreModule {
  constructor(private storeService: StoreService) {
    const reducers = {
      midgardReducer
      // add othe modules reducers here
    };
    storeService.configureStore(reducers); // configure redux in the store with our reducer and intial values
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

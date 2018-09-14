import { NgModule, ModuleWithProviders  } from '@angular/core';
import { StoreService } from '@libs/midgard/src/lib/store-module/store.service';

@NgModule({})
export class MigardStoreModule {
  constructor(private storeService: StoreService) {
    storeService.configureStore(); // configure redux in the store with our reducer and intial values
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

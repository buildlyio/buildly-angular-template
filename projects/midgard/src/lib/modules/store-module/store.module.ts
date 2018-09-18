import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Store } from 'projects/midgard/src/lib/modules/store-module/store';
import { redux } from 'midgard-core';


@NgModule({})
export class MigardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MigardStoreModule,
      providers: [
        Store,
      ]
    };
  }
}

import { NgModule  } from '@angular/core';
import { Store } from 'projects/midgard-angular/src/lib/modules/store/store';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({})
export class MidgardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardStoreModule,
      providers: [
        Store,
      ]
    };
  }
}

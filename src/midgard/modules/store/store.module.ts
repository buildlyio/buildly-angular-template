import { NgModule  } from '@angular/core';
import { Store } from '@src/midgard/modules/store/store';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ProductsEpics } from '@clients/products/src/lib/state/products.epics.ts';


@NgModule({})
export class MidgardStoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardStoreModule,
      providers: [
        ProductsEpics,
        Store,
      ]
    };
  }
}

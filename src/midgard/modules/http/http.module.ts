import { NgModule, ModuleWithProviders  } from '@angular/core';
import { HttpService } from '@src/midgard/modules/http/http.service';

@NgModule({})
export class MidgardHttpModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardHttpModule,
      providers: [
        HttpService,
      ]
    };
  }
}

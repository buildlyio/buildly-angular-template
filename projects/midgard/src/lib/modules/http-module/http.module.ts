import { NgModule, ModuleWithProviders  } from '@angular/core';
import { HttpService } from 'projects/midgard/src/lib/modules/http-module/http.service';

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

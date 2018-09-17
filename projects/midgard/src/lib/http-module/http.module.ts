import { NgModule, ModuleWithProviders  } from '@angular/core';
import { HttpService } from '@libs/midgard/src/lib/http-module/http.service';

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

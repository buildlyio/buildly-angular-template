import { NgModule, ModuleWithProviders  } from '@angular/core';
import { HttpService } from 'projects/midgard-angular/src/lib/modules/http/http.service';

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

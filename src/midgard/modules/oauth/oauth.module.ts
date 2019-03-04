import { NgModule, ModuleWithProviders  } from '@angular/core';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';

@NgModule({})
export class MidgardOAuthModule {
  constructor() {}
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MidgardOAuthModule,
      providers: [
        OAuthService,
      ]
    };
  }
}

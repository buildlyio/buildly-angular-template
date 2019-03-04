import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { TranslationLoader } from './translation-loader/translation-loader.component';
import { MidgardTranslateService } from '@src/midgard/modules/translation/translation-loader/translate.service';

/**
 * @description loads the translations
 * @param {HttpClient} http - http client to send the request
 * @returns {TranslateHttpLoader}
 */
export function createTranslateLoader(httpService: HttpService) {
  return new TranslationLoader(httpService, `assets/i18n`);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpService]
      }
    }),
  ],
  providers: [
    MidgardTranslateService,
    TranslateService
  ],
  exports: [
    TranslateModule
  ]
})
export class MidgardTranslationModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }
}

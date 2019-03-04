import { NgModule } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MidgardTranslateService } from '@libs/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';

@NgModule({
  imports: [
    TranslateModule.forChild({}),
  ],
  providers: [
    MidgardTranslateService,
    TranslateService
  ],
  exports: [
    TranslateModule
  ]
})
export class MidgardSharedTranslationModule {
  constructor( private translate: TranslateService) {
    this.translate.use('en');
  }
}

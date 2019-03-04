import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { MidgardTranslateService } from '../../../projects/midgard-angular/src/lib/modules/translation/translation-loader/translate.service';

@NgModule({
  imports: [
    TranslateModule.forRoot({}),
  ],
  providers: [
    TranslateService,
    MidgardTranslateService
  ],
  exports: [
    TranslateModule
  ]
})
export class MidgardTranslationTestModule {}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MidgardTranslateService {
  constructor (
    private translateService: TranslateService
  ) {}

  /**
   * Returns a translation instantly from the internal state of loaded translation.
   * All rules regarding the current language, the preferred language of even fallback languages will be used except any promise handling.
   */
  instant(key: string | Array<string>, interpolateParams?: Object) {
    return this.translateService.instant(key, interpolateParams);
  }
}

import { HttpService } from '../../http/http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TranslationLoader {

  constructor(private http: HttpService, public endpoint?: string) {}

  /**
   * Gets the translations from the server
   */
  public getTranslation(lang: string): Observable<Object> {
    return this.http.makeRequest('get', `${this.endpoint}/${lang}.json`).pipe(
      map((res: any) => res.data)
    );
  }
}

import { Observable } from 'rxjs';

export interface Http {
  request: (url: string, options?: object) => Observable<any>;
}

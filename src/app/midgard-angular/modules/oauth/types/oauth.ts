import { Observable } from 'rxjs';

export interface Http {
  authenticateWithCredentials: (credentials: object, options?: object) => Observable<any>;
}

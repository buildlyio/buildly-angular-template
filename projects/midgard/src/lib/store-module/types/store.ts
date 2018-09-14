import { Observable } from 'rxjs';

export interface Store<T> extends Observable<T> {
  dispatch: (action: any) => {};
  getState: () => any;
}

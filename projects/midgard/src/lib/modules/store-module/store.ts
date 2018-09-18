import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { midgardEpics } from '@libs/midgard/src/lib/state/midgard.epics';
import { midgardReducer } from '@libs/midgard/src/lib/state/midgard.reducer';
import { Observable } from 'rxjs';


@Injectable()
export class Store<T> extends Observable<T> {
  constructor() {
    super();
    const reducers = {
      midgardReducer
      // add othe modules reducers here
    };
    const epics = [
      midgardEpics
      // add other modules epics here
    ];
    const combinedReducers = redux.combineReducers(reducers); // combine the reducers to one reducer that can be used when creating the store
    const combinedEpics = combineEpics(...epics); // combine redux-observable epics
    const epicMiddleware = createEpicMiddleware(); // create an instance of redux-observable middleware
    const store = redux.createStore(
      combinedReducers,
      composeWithDevTools(
        redux.applyMiddleware(epicMiddleware),
        // other store enhancers if any
      )
    );
    epicMiddleware.run(combinedEpics); // activate redux-observable epics
    return store;
  }

  dispatch: (action: any) => {};
  getState: () => any;
}

/**
 * @description coverts redux store to an Observable
 * @param {Store<any>} store - the redux store to be converted to observable
 * @returns {Observable<any>}
 */
export const getObservableStore = (store: Store<any>): Observable<any> => {
  return Observable.create(observer => {
    observer.next(store.getState()); // emits the inital value

    const dispose = store.subscribe(() => {
      observer.next(store.getState());
    });
    return dispose; // teardown function to unsubscribe to the observable
  });
};


/**
 * @description a function that returns a stream of a portion of the state
 * @param {string} reducer - the reducer of the state to be selected
 * @param {string} key - key of which value will be returned
 * @param {object} oldState - the state before changes happen
 * @returns {<T>(source: Observable<T>) => Observable<T>}
 */
export const select = (reducer: string, key: string, oldState) => <T>(source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(state: any) {
        // emit value only when the state of the selected property is changed
        if (state[reducer][key] !== oldState[reducer][key]) {
          observer.next(state[reducer][key]);
        }
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  });



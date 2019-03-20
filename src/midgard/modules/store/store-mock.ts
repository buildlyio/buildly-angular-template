import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Observable } from 'rxjs';
import { apolloReducer } from '@src/midgard/modules/graphql/apollo-cache-redux';
import { workflowLevel1Reducer } from '@src/midgard/state/workflow-level1/workflow-level1.reducer';
import { workflowLevel2Reducer } from '@src/midgard/state/workflow-level2/workflow-level2.reducer';
import { coreuserReducer } from '@src/midgard/state/coreuser/coreuser.reducer';
import { authuserReducer } from '@src/midgard/state/authuser/authuser.reducer';
import { AuthUserEpics } from '@src/midgard/state/authuser/authuser.epics';
import { WorkflowTeamEpics } from '@src/midgard/state/workflow-team/workflow-team.epics';
import { workflowTeamReducer } from '@src/midgard/state/workflow-team/workflow-team.reducer';
import { topBarReducer } from '@src/midgard/state/top-bar/top-bar.reducer';
import { distinctUntilChanged } from 'rxjs/internal/operators';
import { dashboardsReducer } from '@clients/dashboards/src/lib/state/dashboards.reducer';
import { DashboardsEpics } from '@clients/dashboards/src/lib/state/dashboards.epics';
import { productsReducer } from '@clients/products/src/lib/state/products.reducer';
import { ProductsEpics } from '@clients/products/src/lib/state/products.epics';
let storeInstance: StoreMock<any>;

@Injectable()
export class StoreMock<T> {

  public observable: Observable<T>; // observable store
  subscribe: (listener: () => void) => {};
  dispatch: (action: any) => {};
  getState: () => any;

  constructor() {
    if (storeInstance) {
      return storeInstance;
    } else {
      const reducers = {
        apolloReducer,
        topBarReducer,
        coreuserReducer,
        authuserReducer,
        workflowTeamReducer,
        workflowLevel1Reducer,
        workflowLevel2Reducer,
        dashboardsReducer,
        productsReducer
      };
      const combinedReducers = redux.combineReducers(reducers); // combine the reducers to a reducer that can be used when creating the store
      const store = redux.createStore(
        combinedReducers,
        composeWithDevTools(
        // other store enhancers if any
        )
      );
      store.observable = this.toObservable();
      storeInstance = store;
      return store;
    }
  }

  /**
   * converts redux store to an Observable
   * @param {Store<any>} store - the redux store to be converted to observable
   * @returns {Observable<any>}
   */
  toObservable = (): Observable<any> => {
    return Observable.create(observer => {
      observer.next(storeInstance.getState()); // emits the inital value

      const dispose = storeInstance.subscribe(() => {
        observer.next(storeInstance.getState());
      });
      return dispose; // teardown function to unsubscribe to the observable
    });
  }
}

/**
 * a function that returns a stream of the state depending on a given selector
 * @param {Function} selector - memoized selector
 * @returns {<T>(source: Observable<T>) => Observable<T>}
 */
export const select = (selector: Function) => <T>(source: Observable<T>) =>
  new Observable<T>(observer => {
    return source.subscribe({
      next(state: any) {
        console.log(state);
        observer.next(selector(state));
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  }).pipe(distinctUntilChanged());


import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Observable } from 'rxjs';
import { apolloReducer } from '@src/midgard/modules/graphql/apollo-cache-redux';
import { workflowLevel1Reducer } from '@src/midgard/state/workflow-level1/workflow-level1.reducer';
import { WorkflowLevel1Epics } from '../../state/workflow-level1/workflow-level1.epics';
import { workflowLevel2Reducer } from '@src/midgard/state/workflow-level2/workflow-level2.reducer';
import { WorkflowLevel2Epics } from '../../state/workflow-level2/workflow-level2.epics';
import { CoreUserEpics } from '../../state/coreuser/coreuser.epics';
import { coreuserReducer } from '@src/midgard/state/coreuser/coreuser.reducer';
import { authuserReducer } from '@src/midgard/state/authuser/authuser.reducer';
import { AuthUserEpics } from '@src/midgard/state/authuser/authuser.epics';
import { WorkflowTeamEpics } from '@src/midgard/state/workflow-team/workflow-team.epics';
import { workflowTeamReducer } from '@src/midgard/state/workflow-team/workflow-team.reducer';
import { topBarReducer } from '@src/midgard/state/top-bar/top-bar.reducer';
import { distinctUntilChanged } from 'rxjs/internal/operators';
let storeInstance: Store<any>;

@Injectable()
export class Store<T> {

  public observable: Observable<T>; // observable store
  subscribe: (listener: () => void) => {};
  dispatch: (action: any) => {};
  getState: () => any;

  constructor(
    private authUserEpics: AuthUserEpics,
    private coreUserEpics: CoreUserEpics,
    private workflowTeamEpics: WorkflowTeamEpics,
    private workflowLevel1Epics: WorkflowLevel1Epics,
    private workflowLevel2Epics: WorkflowLevel2Epics
    ) {
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
        workflowLevel2Reducer
      };
      const epics = [
        coreUserEpics,
        authUserEpics,
        workflowTeamEpics,
        workflowLevel1Epics,
        workflowLevel2Epics
      ];
      const combinedReducers = redux.combineReducers(reducers); // combine the reducers to a reducer that can be used when creating the store
      const combinedEpics = redux.combineEpics(...epics); // combine redux-observable epics
      const epicMiddleware = redux.createEpicMiddleware(); // create an instance of redux-observable middleware
      const store = redux.createStore(
        combinedReducers,
        composeWithDevTools(
          redux.applyMiddleware(epicMiddleware),
          // other store enhancers if any
        )
      );
      epicMiddleware.run(combinedEpics); // activate redux-observable epics
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
        observer.next(selector(state));
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    });
  }).pipe(distinctUntilChanged());


import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { MidgardState } from 'projects/midgard/src/lib/state/midgard.model';
import { Store } from '@libs/midgard/src/lib/modules/store-module/types/store';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';


@Injectable()
export class StoreService {

  private store: Store<any>;

  /**
   * @description configures redux in the core with our app reducers and return the store instance
   * @param reducers - our app reducers in an object
   * @returns {Store}
   */
  configureStore(combinedReducers, combinedEpics): Store<any> {
    const epicMiddleware = createEpicMiddleware(); // create an instance of redux-observable middleware
    this.store = redux.createStore(
    combinedReducers,
      composeWithDevTools(
        redux.applyMiddleware(epicMiddleware),
        // other store enhancers if any
      )
    );

    epicMiddleware.run(combinedEpics); // activate redux observable-epics

    return this.store;
  }

  /**
   * @description gets the redux store instance
   * @returns {Store}
   */
  getInstance(): Store<MidgardState> {
    return this.store;
  }
}

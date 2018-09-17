import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { Store } from '@libs/midgard/src/lib/store-module/types/store';
import { MidgardState } from '@libs/midgard/src/lib/state/midgard.model';

@Injectable()
export class StoreService {

  private store: Store<any>;

  /**
   * @description configures redux in the core with our app reducers and return the store instance
   * @param reducers - our app reducers in an object
   * @returns {Store}
   */
  configureStore(reducers): Store<any> {
    const combinedReducers = redux.combineReducers(reducers); // combine the reducers to one reducer that can be used when creating the store
    this.store = redux.createStore(combinedReducers);
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

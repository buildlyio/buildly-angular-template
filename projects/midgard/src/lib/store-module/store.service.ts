import { Injectable } from '@angular/core';
import core from 'midgard-core';
import { midgardReducer } from 'projects/midgard/src/lib/state/midgard.reducer';
import { Store } from '@libs/midgard/src/lib/store-module/types/store';
import { MidgardState } from '@libs/midgard/src/lib/state/midgard-state.model';

@Injectable()
export class StoreService {

  store: Store<MidgardState>;

  /**
   * @description configures redux in the core and return the store instance
   * @returns {Store}
   */
  configureStore(): Store<MidgardState> {
    this.store = core.configureStore(midgardReducer);
    return this.store;
  }

  /**
   * @description gets the current app redux state
   */
  getState() {
    return this.store.getState();
  }

  /**
   * @description gets the redux store instance
   * @returns {Store}
   */
  getInstance(): Store<MidgardState> {
    return this.store;
  }
}

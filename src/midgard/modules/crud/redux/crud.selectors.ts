import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import { CrudState } from './crud.reducer';


const getCrudState = state => state.crudDataReducer;

/**
 * selector all data from a specific endpoint
 * @param endpoint - the endpoint the data is loaded from
 * @returns {MemoizedSelector}
 */
export const selectAllfromEndpoint = (endpoint: string) => redux.createSelector(
  getCrudState,
  (crudState: CrudState) => {
    if (crudState) {
      return crudState.endpoints[endpoint].data;
    }
  }
);

/**
 * selector to check if the data is loaded by the crud module from a specific endpoint
 * @param endpoint - the endpoint the data is loaded from
 * @returns {MemoizedSelector}
 */
export const selectEndpointLoaded = (endpoint: string) => redux.createSelector(
  getCrudState,
  (crudState: CrudState) => {
    if (crudState) {
      return crudState.endpoints[endpoint].loaded;
    }
  }
);

import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import { CrudState } from './crud.reducer';


const getCrudState = state => state.crudDataReducer;

/**
 * selector all data from a specific endpoint
 * @param endpoint - the endpoint the data is loaded from
 * @param dataProp - the data property in the result object that the data is loaded from
 * @returns {MemoizedSelector}
 */
export const selectAllfromEndpoint = (endpoint: string, dataProp?: string) => redux.createSelector(
  getCrudState,
  (crudState: CrudState) => {
    if (crudState && crudState[endpoint]) {
      if (!dataProp || dataProp === 'data') {
        return crudState[endpoint].data;
      } else {
        return crudState[endpoint].data[dataProp];
      }
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
    if (crudState && crudState[endpoint]) {
      return crudState[endpoint].loaded;
    }
  }
);

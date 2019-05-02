import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import {CoreGroupState} from './coregroup.reducer';


const getCoreGroups = state => state.coregroupReducer;

/**
 * selector to get all core groups other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getAllCoreGroups = redux.createSelector(
  getCoreGroups,
  (coreGroupState: CoreGroupState) => {
    if (coreGroupState) {
      return coreGroupState;
    }
  }
);

/**
 * selector to get all core groups other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getCoreGroupsLoaded = redux.createSelector(
  getCoreGroups,
  (coreUserState: CoreGroupState) => {
    if (coreUserState) {
      return coreUserState.loaded;
    }
  }
);



import { redux } from 'midgard-core';
import { CoreGroupState } from './coregroup.reducer';

const getCoreGroups = (state: any) => state.coregroupReducer;

/**
 * selector to get all core groups other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getAllCoreGroups = redux.createSelector(
  getCoreGroups,
  (coreGroupState: CoreGroupState) => {
    if (coreGroupState) {
      return coreGroupState.data;
    }
    return null;
  },
);

/**
 * selector to check if the core groups are loaded
 * @returns {MemoizedSelector}
 */
export const getCoreGroupsLoaded = redux.createSelector(
  getCoreGroups,
  (coreUserState: CoreGroupState) => {
    if (coreUserState) {
      return coreUserState.loaded;
    }
    return null;
  },
);

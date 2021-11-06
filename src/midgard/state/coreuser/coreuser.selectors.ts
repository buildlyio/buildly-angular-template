import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import { CoreUserState } from './coreuser.reducer';

const getCoreUsers = (state: any) => state.coreuserReducer;

/**
 * selector to get all core user other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getAllCoreUsers = redux.createSelector(
  getCoreUsers,
  (coreUserState: CoreUserState) => {
    if (coreUserState) {
      const authUser = JSON.parse(localStorage.getItem('oauthUser')!);
      return coreUserState.data?.map((coreuser: any) => {
        coreuser.fullName = `${coreuser.first_name} ${coreuser.last_name}`;
        return coreuser;
      }).filter((coreuser) => coreuser.email !== authUser.email);
    }
    return null;
  },
);

/**
 * selector to get all core user other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getCoreUsersLoaded = redux.createSelector(
  getCoreUsers,
  (coreUserState: CoreUserState) => {
    if (coreUserState) {
      return coreUserState.loaded;
    }
    return null;
  },
);

/**
 * @returns {MemoizedSelector} returning the workflow team of a specific user and add the workflow label
 * @param {string} userId - current user id
 */
export const getCoreUser = (userId: string) => reselect.createSelector(
  getAllCoreUsers,
  (coreUsers: any) => coreUsers.data.find((coreUser: any) => coreUser.core_user_uuid === userId),
);

import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import {CoreUserState} from './coreuser.reducer';


const getCoreUsers = state => state.coreuserReducer;

/**
 * selector to get all core user other than the authenticated user
 * @returns {MemoizedSelector}
 */
export const getAllCoreUsers = redux.createSelector(
  getCoreUsers,
  (coreUserState: CoreUserState) => {
    if (coreUserState) {
      const authUser = JSON.parse(localStorage.getItem('oauthUser'));
      return coreUserState.data.map((coreuser: any) => {
          coreuser.fullName = `${coreuser.first_name} ${coreuser.last_name}`;
          coreuser.email = coreuser.email;
          coreuser.is_active = coreuser.is_active;
          return coreuser;
        }).filter( coreuser => {
          return coreuser.email !== authUser.email;
        });
    }
  }
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
  }
);



/**
 * @returns {MemoizedSelector} returning the workflow team of a specific user and add the workflow label
 * @param {string} userId - current user id
 */
export const getCoreUser = (userId: string) => reselect.createSelector(
  getAllCoreUsers,
  (coreUsers) => {
    return coreUsers.data.find( coreUser => {
      return coreUser.core_user_uuid === userId;
    });
  });

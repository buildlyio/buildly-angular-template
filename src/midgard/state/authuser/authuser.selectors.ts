import { redux } from 'midgard-core';
import { AuthUserState } from './authuser.reducer';

const getAuthUserState = (state: any) => state.authuserReducer;

export const getAuthUser = redux.createSelector(
  getAuthUserState,
  (authUserState: AuthUserState) => {
    if (authUserState.data) {
      if (authUserState.data.user) {
        return {
          data: {
            id: authUserState.data.id,
            username: authUserState.data.user.username,
            first_name: authUserState.data.user.first_name,
            last_name: authUserState.data.user.last_name,
            email: authUserState.data.user.email,
          },
          loaded: true,
        };
      }
      return {
        data: authUserState.data,
        loaded: true,
      };
    }
    return null;
  },
);

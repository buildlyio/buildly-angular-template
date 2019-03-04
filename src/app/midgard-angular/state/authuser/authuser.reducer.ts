import {
  LOAD_AUTHUSER_COMMIT,
  UPDATE_AUTHUSER_COMMIT
} from '@libs/midgard-angular/src/lib/state/authuser/authuser.actions';
import { upsertOne } from '@libs/midgard-angular/src/lib/modules/store/reducer.utils';
import { CoreUser } from '../coreuser/coreuser.model';

export interface AuthUserState {
  data: CoreUser;
  loaded: boolean;
  updated: boolean;
}
const initialState: AuthUserState = {
  data: null,
  loaded: false,
  updated: false
};

export function authuserReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_AUTHUSER_COMMIT:
      return upsertOne(state, action);
    case UPDATE_AUTHUSER_COMMIT:
      return upsertOne(state, action);
    default:
      return state;
  }
}

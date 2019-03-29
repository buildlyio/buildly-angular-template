import {
  CREATE_COREUSER_COMMIT,
  DELETE_COREUSER_COMMIT,
  LOAD_DATA_COREUSER_COMMIT, UPDATE_COREUSER_COMMIT
} from './coreuser.actions';
import {addAll, deleteOne, upsertOne} from '@src/midgard/modules/store/reducer.utils';
import {CoreUser} from './coreuser.model';

export interface CoreUserState {
  data: CoreUser[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: CoreUserState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function coreuserReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_COREUSER_COMMIT:
      return addAll(state, action);
    case CREATE_COREUSER_COMMIT:
      return upsertOne(state, action, 'id');
    case UPDATE_COREUSER_COMMIT:
      return upsertOne(state, action, 'id');
    case DELETE_COREUSER_COMMIT:
      return deleteOne(state, action, 'id');
    default:
      return state;
  }
}

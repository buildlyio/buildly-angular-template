import {
  CREATE_COMMIT,
  DELETE_COMMIT,
  LOAD_DATA_COMMIT,
  UPDATE_COMMIT,
} from './crud.actions';
import {addAll, deleteOne, upsertOne} from '@src/midgard/modules/store/reducer.utils';
import { CrudAction } from './crud.action.model';

export interface EndpointState {
  data: any[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}

export interface CrudState {
  endpoints: EndpointState[];
}

const initialState: CrudState = {
  endpoints: [],
};

export function crudDataReducer(state: CrudState = initialState, action: CrudAction) {
  switch (action.type) {
    case LOAD_DATA_COMMIT:
      const newState: CrudState = {...state};
      newState.endpoints[action.endpoint] = addAll(state.endpoints[action.endpoint], action);
      return newState;
    case CREATE_COMMIT:
      const newState: CrudState = {...state};
      newState.endpoints[action.endpoint] = upsertOne(state.endpoints[action.endpoint], action);
      return newState;
    case UPDATE_COMMIT:
      const newState: CrudState = {...state};
      newState.endpoints[action.endpoint] = upsertOne(state.endpoints[action.endpoint], action);
      return newState;
    case DELETE_COMMIT:
      const newState: CrudState = {...state};
      newState.endpoints[action.endpoint] = deleteOne(state.endpoints[action.endpoint], action);
      return newState;
    default:
      return state;
  }
}

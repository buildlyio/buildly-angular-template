import {
  CRUD_CREATE_COMMIT,
  CRUD_DELETE_COMMIT,
  CRUD_LOAD_DATA_COMMIT,
  CRUD_UPDATE_COMMIT,
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
  [key: string]: EndpointState;
}

export function crudDataReducer(state: CrudState = {}, action: CrudAction) {
  const newState: CrudState = {...state};
  switch (action.type) {
    case CRUD_LOAD_DATA_COMMIT:
      newState[action.endpoint] = addAll(state[action.endpoint], action);
      return newState;
    case CRUD_DELETE_COMMIT:
      newState[action.endpoint] = deleteOne(state[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    case CRUD_CREATE_COMMIT:
      newState[action.endpoint] = upsertOne(state[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    case CRUD_UPDATE_COMMIT:
      newState[action.endpoint] = upsertOne(state[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    default:
      return state;
  }
}

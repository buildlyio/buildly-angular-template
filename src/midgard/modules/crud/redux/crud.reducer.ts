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
  endpoints: EndpointState[];
}

const initialState: CrudState = {
  endpoints: [],
};

export function crudDataReducer(state: CrudState = initialState, action: CrudAction) {
  let newState: CrudState = {...state};
  switch (action.type) {
    case CRUD_CREATE_COMMIT:
      newState = {...state};
      newState.endpoints[action.endpoint] = addAll(state.endpoints[action.endpoint], action);
      return newState;
    case CRUD_DELETE_COMMIT:
      newState = {...state};
      newState.endpoints[action.endpoint] = upsertOne(state.endpoints[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    case CRUD_LOAD_DATA_COMMIT:
      newState = {...state};
      newState.endpoints[action.endpoint] = upsertOne(state.endpoints[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    case CRUD_UPDATE_COMMIT:
      newState = {...state};
      newState.endpoints[action.endpoint] = deleteOne(state.endpoints[action.endpoint], action, action.idProp, action.dataProp);
      return newState;
    default:
      return state;
  }
}

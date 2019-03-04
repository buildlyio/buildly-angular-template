import {
  CREATE_WORKFLOWLEVEL2_COMMIT,
  DELETE_WORKFLOWLEVEL2_COMMIT,
  LOAD_ALL_WORKFLOWLEVEL2_COMMIT, LOAD_ONE_WORKFLOWLEVEL2_COMMIT, UPDATE_WORKFLOWLEVEL2_COMMIT
} from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/modules/store/reducer.utils';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';
import {WorkflowLevel2} from './workflow-level2.model';

export interface WorkflowLevel2State {
  data: WorkflowLevel2[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: WorkflowLevel2State = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function workflowlevel2Reducer(state = initialState, action: Action) {
  switch (action.type) {
    // case APOLLO_OVERWRITE:
    //   return addFromGraphQl(state, action, 'WorkflowLevel2');
    case LOAD_ALL_WORKFLOWLEVEL2_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_WORKFLOWLEVEL2_COMMIT:
      return upsertOne(state, action);
    case CREATE_WORKFLOWLEVEL2_COMMIT:
      return upsertOne(state, action);
    case UPDATE_WORKFLOWLEVEL2_COMMIT:
      return upsertOne(state, action);
    case DELETE_WORKFLOWLEVEL2_COMMIT:
      return deleteOne(state, action);
    default:
      return state;
  }
}

import {
  LOAD_ALL_WORKFLOWLEVEL1_FROM_GRAPHQL,
  LOAD_DATA_WORKFLOWLEVEL1_COMMIT
} from '@src/midgard/state/workflow-level1/workflow-level1.actions';
import { addAll, addNested, deleteNested, updateNested, upsertOne } from '@src/midgard/modules/store/reducer.utils';
import {
  CREATE_WORKFLOWLEVEL2_COMMIT, DELETE_WORKFLOWLEVEL2_COMMIT,
  UPDATE_WORKFLOWLEVEL2_COMMIT
} from '@src/midgard/state/workflow-level2/workflow-level2.actions';
import { WorkflowLevel1 } from './workflow-level1.model';

export interface WorkflowLevel1State {
  data: WorkflowLevel1[];
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: WorkflowLevel1State = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false
};

export function workflowlevel1Reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_WORKFLOWLEVEL1_COMMIT:
      return addAll(state, action);
    case LOAD_ALL_WORKFLOWLEVEL1_FROM_GRAPHQL:
      return addAll(state, action);
    case CREATE_WORKFLOWLEVEL2_COMMIT:
      return addNested(state, action);
    case UPDATE_WORKFLOWLEVEL2_COMMIT:
      return updateNested(state, action);
    case DELETE_WORKFLOWLEVEL2_COMMIT:
      return deleteNested(state, action);
    default:
      return state;
  }
}

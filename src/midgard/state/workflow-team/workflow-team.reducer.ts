import { addAll, deleteOne, upsertOne } from '@src/midgard/modules/store/reducer.utils';
import { Action } from '@src/midgard/state/action.type';
import {
  CREATE_WORKFLOWTEAM_COMMIT,
  DELETE_WORKFLOWTEAM_COMMIT,
  LOAD_ALL_WORKFLOWTEAMS_COMMIT, LOAD_ONE_WORKFLOWTEAM_COMMIT, UPDATE_WORKFLOWTEAM_COMMIT,
} from './workflow-team.actions';
import { WorkflowTeam } from './workflow-team.model';

export interface WorkflowTeamState {
  data: WorkflowTeam[] | null;
  loaded: false;
  created: false;
  updated: false;
  deleted: false;
}
const initialState: WorkflowTeamState = {
  data: [],
  loaded: false,
  created: false,
  updated: false,
  deleted: false,
};

export function workflowTeamReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ALL_WORKFLOWTEAMS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action, 'id');
    case CREATE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action, 'id');
    case UPDATE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action, 'id');
    case DELETE_WORKFLOWTEAM_COMMIT:
      return deleteOne(state, action, 'id');
    default:
      return state;
  }
}

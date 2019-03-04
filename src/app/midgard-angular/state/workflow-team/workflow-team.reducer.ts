import {
  CREATE_WORKFLOWTEAM_COMMIT,
  DELETE_WORKFLOWTEAM_COMMIT,
  LOAD_ALL_WORKFLOWTEAMS_COMMIT, LOAD_ONE_WORKFLOWTEAM_COMMIT, UPDATE_WORKFLOWTEAM_COMMIT
} from './workflow-team.actions';
import { addAll, deleteOne, upsertOne } from '@libs/midgard-angular/src/lib/modules/store/reducer.utils';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';
import { WorkflowTeam } from './workflow-team.model';

export interface WorkflowTeamState {
  data: WorkflowTeam[];
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
  deleted: false
};

export function workflowTeamReducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_ALL_WORKFLOWTEAMS_COMMIT:
      return addAll(state, action);
    case LOAD_ONE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action);
    case CREATE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action);
    case UPDATE_WORKFLOWTEAM_COMMIT:
      return upsertOne(state, action);
    case DELETE_WORKFLOWTEAM_COMMIT:
      return deleteOne(state, action);
    default:
      return state;
  }
}

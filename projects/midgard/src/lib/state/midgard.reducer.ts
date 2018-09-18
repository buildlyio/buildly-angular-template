import { MidgardState } from '@libs/midgard/src/lib/state/midgard.model';
import {
  LOAD_DATA_WORKFLOWLEVEL1_COMMIT,
  LOAD_DATA_WORKFLOWLEVEL2_COMMIT
} from '@libs/midgard/src/lib/state/midgard.actions';

const initialState: MidgardState = {
  workflowLevel1: [],
  workflowLevel2: [],
  dataLoaded: false
};

export function midgardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_WORKFLOWLEVEL1_COMMIT:
      return Object.assign({}, state, {
        workflowLevel1: action.data,
        dataLoaded: true
      });

    case LOAD_DATA_WORKFLOWLEVEL2_COMMIT:
      return Object.assign({}, state, {
        workflowLevel2: action.data,
        dataLoaded: true
      });
    default:
      return state;
  }
}

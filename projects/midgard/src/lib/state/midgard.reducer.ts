import { MidgardState } from '@libs/midgard/src/lib/state/midgard.model';
import { LOAD_DATA_WORKFLOWLEVEL1, LOAD_DATA_WORKFLOWLEVEL2 } from '@libs/midgard/src/lib/state/midgard.actions';

const initialState: MidgardState = {
  workflowLevel1: [],
  workflowLevel2: [],
  dataLoaded: false
};

export function midgardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_WORKFLOWLEVEL1:
      return Object.assign({}, state, {
        workflowLevel1: action.data,
        workflowLevel2: [],
        dataLoaded: true
      });
    case LOAD_DATA_WORKFLOWLEVEL2:
      return Object.assign({}, state, {
        workflowLevel1: [],
        workflowLevel2: action.data,
        dataLoaded: true
      });
    default:
      return state;
  }
}

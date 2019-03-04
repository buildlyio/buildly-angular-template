import { merge, cloneDeep } from 'lodash';
import {
    APOLLO_OVERWRITE,
    APOLLO_RESET,
    APOLLO_WRITE
} from './constants';
import { UPDATE_WORKFLOWLEVEL2_COMMIT } from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';

const initialState: any = {};

export function apolloReducer(state = initialState, action: any) {
    switch (action.type) {
        case APOLLO_RESET:
          return initialState;
        case APOLLO_OVERWRITE:
          return action.data;
        case APOLLO_WRITE:
          const newObj = cloneDeep(state);
          return merge(newObj, action.data);
        default:
            return state;
    }
}

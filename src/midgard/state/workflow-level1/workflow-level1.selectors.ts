import { redux } from 'midgard-core';
import { WorkflowLevel1State } from './workflow-level1.reducer';

const getWorkflowLevel1s = (state: any) => state.workflowLevel1Reducer;

export const getAllWorkflowLevel1s = redux.createSelector(
  getWorkflowLevel1s,
  (workflowLevel1State: WorkflowLevel1State) => {
    if (workflowLevel1State) {
      return workflowLevel1State;
    }
    return null;
  },
);

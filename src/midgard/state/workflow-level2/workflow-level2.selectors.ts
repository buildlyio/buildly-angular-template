import { redux } from 'midgard-core';
import { reselect } from '@src/midgard/modules/store';
import { WorkflowLevel2State } from './workflow-level2.reducer';

const getWorkflowLevel2s = (state: any) => state.workflowLevel2Reducer;

export const getAllWorkflowLevel2s = redux.createSelector(
  getWorkflowLevel2s,
  (workflowLevel2State: WorkflowLevel2State) => workflowLevel2State,
);

/**
 * selector that selects one workflowlevel2 from the workflowlevel2Reducer
 * @param {number} id - id of the workflowlevel2
 * @returns {MemoizedSelector<any, any>}
 */
export const selectWorkflowLevel2 = (id: string) => reselect.createSelector(
  getWorkflowLevel2s,
  (workflowLevel2State: WorkflowLevel2State) => workflowLevel2State.data?.find((workflowLevel2) => workflowLevel2.id?.toString() === id),
);

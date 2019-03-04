import {Workflow} from '@angular-devkit/schematics/src/workflow';
import {WorkflowLevel1} from './workflow-level1.model';

export const LOAD_DATA_WORKFLOWLEVEL1 = 'LOAD_DATA_WORKFLOWLEVEL1';
export const LOAD_DATA_WORKFLOWLEVEL1_COMMIT = 'LOAD_DATA_WORKFLOWLEVEL1_COMMIT';
export const LOAD_DATA_WORKFLOWLEVEL1_FAIL = 'LOAD_DATA_WORKFLOWLEVEL1_FAIL';

export const LOAD_ALL_WORKFLOWLEVEL1_FROM_GRAPHQL = 'LOAD_ALL_WORKFLOWLEVEL1_FROM_GRAPHQL';

export function loadWorkflowLevel1Data() {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL1,
  };
}

export function loadWorkflowLevel1DataCommit(data: WorkflowLevel1[]) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL1_COMMIT,
    data
  };
}

export function loadWorkflowLevel1DataFail(error) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL1_FAIL,
    error
  };
}

export function loadAllWorkflowlevel1FromGraphQl(data) {
  return {
    type: LOAD_ALL_WORKFLOWLEVEL1_FROM_GRAPHQL,
    data
  };
}

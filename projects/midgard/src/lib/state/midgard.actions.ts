export const LOAD_DATA_WORKFLOWLEVEL1 = 'LOAD_DATA_WORKFLOWLEVEL1';
export const LOAD_DATA_WORKFLOWLEVEL1_COMMIT = 'LOAD_DATA_WORKFLOWLEVEL1_COMMIT';
export const LOAD_DATA_WORKFLOWLEVEL1_FAIL = 'LOAD_DATA_WORKFLOWLEVEL1_FAIL';

export const LOAD_DATA_WORKFLOWLEVEL2 = 'LOAD_DATA_WORKFLOWLEVEL2';
export const LOAD_DATA_WORKFLOWLEVEL2_COMMIT = 'LOAD_DATA_WORKFLOWLEVEL2_COMMIT';
export const LOAD_DATA_WORKFLOWLEVEL2_FAIL = 'LOAD_DATA_WORKFLOWLEVEL2_FAIL';

export function loadWorkflowLevel1Data() {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL1,
  };
}

export function loadWorkflowLevel1DataCommit(data) {
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

export function loadWorkflowLevel2Data() {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL2,
  };
}

export function loadWorkflowLevel2DataCommit(data) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL2_COMMIT,
    data
  };
}

export function loadWorkflowLevel2DataFail(error) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL2_FAIL,
    error
  };
}

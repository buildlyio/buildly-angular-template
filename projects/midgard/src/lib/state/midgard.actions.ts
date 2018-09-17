export const LOAD_DATA_WORKFLOWLEVEL1 = 'LOAD_DATA_WORKFLOWLEVEL1';
export const LOAD_DATA_WORKFLOWLEVEL1_COMMIT = 'LOAD_DATA_WORKFLOWLEVEL1_COMMIT';
export const LOAD_DATA_WORKFLOWLEVEL1_FAIL = 'LOAD_DATA_WORKFLOWLEVEL1_FAIL';


export const LOAD_DATA_WORKFLOWLEVEL2 = 'LOAD_DATA_WORKFLOWLEVEL2';

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

export function loadWorkflowLevel2Data(data) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL2,
    data
  };
}

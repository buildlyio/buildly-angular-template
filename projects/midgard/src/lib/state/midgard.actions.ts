export const LOAD_DATA_WORKFLOWLEVEL1 = 'LOAD_DATA_WORKFLOWLEVEL1';
export const LOAD_DATA_WORKFLOWLEVEL2 = 'LOAD_DATA_WORKFLOWLEVEL2';

export function loadWorkflowLevel1Data(data) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL1,
    data
  };
}

export function loadWorkflowLevel2Data(data) {
  return {
    type: LOAD_DATA_WORKFLOWLEVEL2,
    data
  };
}

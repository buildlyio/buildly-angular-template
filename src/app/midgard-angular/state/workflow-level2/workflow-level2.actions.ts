// Load All
import {WorkflowLevel2} from './workflow-level2.model';

export const LOAD_ALL_WORKFLOWLEVEL2 = 'LOAD_ALL_WORKFLOWLEVEL2';
export const LOAD_ALL_WORKFLOWLEVEL2_COMMIT = 'LOAD_ALL_WORKFLOWLEVEL2_COMMIT';
export const LOAD_ALL_WORKFLOWLEVEL2_FAIL = 'LOAD_ALL_WORKFLOWLEVEL2_FAIL';

// Load One
export const LOAD_ONE_WORKFLOWLEVEL2 = 'LOAD_ONE_WORKFLOWLEVEL2';
export const LOAD_ONE_WORKFLOWLEVEL2_COMMIT = 'LOAD_ONE_WORKFLOWLEVEL2_COMMIT';
export const LOAD_ONE_WORKFLOWLEVEL2_FAIL = 'LOAD_ONE_WORKFLOWLEVEL2_FAIL';

// Create
export const CREATE_WORKFLOWLEVEL2 = 'CREATE_WORKFLOWLEVEL2';
export const CREATE_WORKFLOWLEVEL2_COMMIT = 'CREATE_WORKFLOWLEVEL2_COMMIT';
export const CREATE_WORKFLOWLEVEL2_FAIL = 'CREATE_WORKFLOWLEVEL2_FAIL';

// Update
export const UPDATE_WORKFLOWLEVEL2 = 'UPDATE_WORKFLOWLEVEL2';
export const UPDATE_WORKFLOWLEVEL2_COMMIT = 'UPDATE_WORKFLOWLEVEL2_COMMIT';
export const UPDATE_WORKFLOWLEVEL2_FAIL = 'UPDATE_WORKFLOWLEVEL2_FAIL';

// Delete
export const DELETE_WORKFLOWLEVEL2 = 'DELETE_WORKFLOWLEVEL2';
export const DELETE_WORKFLOWLEVEL2_COMMIT = 'DELETE_WORKFLOWLEVEL2_COMMIT';
export const DELETE_WORKFLOWLEVEL2_FAIL = 'DELETE_WORKFLOWLEVEL2_FAIL';


export function loadWorkflowLevel2() {
  return {
    type: LOAD_ALL_WORKFLOWLEVEL2,
  };
}

export function loadWorkflowLevel2Commit(data: WorkflowLevel2[]) {
  return {
    type: LOAD_ALL_WORKFLOWLEVEL2_COMMIT,
    data
  };
}

export function loadWorkflowLevel2Fail(error) {
  return {
    type: LOAD_ALL_WORKFLOWLEVEL2_FAIL,
    error
  };
}

export function loadOneWorkflowLevel2(id: string) {
  return {
    type: LOAD_ONE_WORKFLOWLEVEL2,
    id
  };
}

export function loadOneWorkflowLevel2Commit(data: WorkflowLevel2) {
  return {
    type: LOAD_ONE_WORKFLOWLEVEL2_COMMIT,
    data
  };
}

export function loadOneWorkflowLevel2Fail(error) {
  return {
    type: LOAD_ONE_WORKFLOWLEVEL2_FAIL,
    error
  };
}

export function createWorkflowLevel2(data: WorkflowLevel2) {
  return {
    type: CREATE_WORKFLOWLEVEL2,
    data,
  };
}

export function createWorkflowLevel2Commit(data: WorkflowLevel2, nested) {
  return {
    type: CREATE_WORKFLOWLEVEL2_COMMIT,
    data,
    nested
  };
}

export function createWorkflowLevel2Fail(error) {
  return {
    type: CREATE_WORKFLOWLEVEL2_FAIL,
    error
  };
}

export function updateWorkflowLevel2(data: WorkflowLevel2) {
  return {
    type: UPDATE_WORKFLOWLEVEL2,
    data
  };
}

export function updateWorkflowLevel2Commit(data: WorkflowLevel2, nested) {
  return {
    type: UPDATE_WORKFLOWLEVEL2_COMMIT,
    data,
    nested
  };
}

export function updateWorkflowLevel2Fail(error) {
  return {
    type: UPDATE_WORKFLOWLEVEL2_FAIL,
    error
  };
}

export function deleteWorkflowLevel2(data: WorkflowLevel2) {
  return {
    type: DELETE_WORKFLOWLEVEL2,
    data
  };
}

export function deleteWorkflowLevel2Commit(data, nested) {
  return {
    type: DELETE_WORKFLOWLEVEL2_COMMIT,
    data,
    nested
  };
}

export function deleteWorkflowLevel2Fail(error) {
  return {
    type: DELETE_WORKFLOWLEVEL2_FAIL,
    error
  };
}

// Load All
import { WorkflowTeam } from './workflow-team.model';

export const LOAD_ALL_WORKFLOWTEAMS = 'LOAD_ALL_WORKFLOWTEAMS';
export const LOAD_ALL_WORKFLOWTEAMS_COMMIT = 'LOAD_ALL_WORKFLOWTEAMS_COMMIT';
export const LOAD_ALL_WORKFLOWTEAMS_FAIL = 'LOAD_ALL_WORKFLOWTEAMS_FAIL';

// Load One
export const LOAD_ONE_WORKFLOWTEAM = 'LOAD_ONE_WORKFLOWTEAM';
export const LOAD_ONE_WORKFLOWTEAM_COMMIT = 'LOAD_ONE_WORKFLOWTEAM_COMMIT';
export const LOAD_ONE_WORKFLOWTEAM_FAIL = 'LOAD_ONE_WORKFLOWTEAM_FAIL';

// Create
export const CREATE_WORKFLOWTEAM = 'CREATE_WORKFLOWTEAM';
export const CREATE_WORKFLOWTEAM_COMMIT = 'CREATE_WORKFLOWTEAM_COMMIT';
export const CREATE_WORKFLOWTEAM_FAIL = 'CREATE_WORKFLOWTEAM_FAIL';

// Update
export const UPDATE_WORKFLOWTEAM = 'UPDATE_WORKFLOWTEAM';
export const UPDATE_WORKFLOWTEAM_COMMIT = 'UPDATE_WORKFLOWTEAM_COMMIT';
export const UPDATE_WORKFLOWTEAM_FAIL = 'UPDATE_WORKFLOWTEAM_FAIL';

// Delete
export const DELETE_WORKFLOWTEAM = 'DELETE_WORKFLOWTEAM';
export const DELETE_WORKFLOWTEAM_COMMIT = 'DELETE_WORKFLOWTEAM_COMMIT';
export const DELETE_WORKFLOWTEAM_FAIL = 'DELETE_WORKFLOWTEAM_FAIL';

// Save blob URL
export const SAVE_BLOB_URL = 'SAVE_BLOB_URL';

export function loadWorflowTeams() {
  return {
    type: LOAD_ALL_WORKFLOWTEAMS,
  };
}

export function loadWorflowTeamsCommit(data: WorkflowTeam[]) {
  return {
    type: LOAD_ALL_WORKFLOWTEAMS_COMMIT,
    data,
  };
}

export function loadWorflowTeamsFail(error: any) {
  return {
    type: LOAD_ALL_WORKFLOWTEAMS_FAIL,
    error,
  };
}

export function loadOneWorflowTeam(id: string) {
  return {
    type: LOAD_ONE_WORKFLOWTEAM,
    id,
  };
}

export function loadOneWorflowTeamCommit(data: WorkflowTeam) {
  return {
    type: LOAD_ONE_WORKFLOWTEAM_COMMIT,
    data,
  };
}

export function loadOneWorflowTeamFail(error: any) {
  return {
    type: LOAD_ONE_WORKFLOWTEAM_FAIL,
    error,
  };
}

export function createWorflowTeam(data: WorkflowTeam) {
  return {
    type: CREATE_WORKFLOWTEAM,
    data,
  };
}

export function createWorflowTeamCommit(data: WorkflowTeam) {
  return {
    type: CREATE_WORKFLOWTEAM_COMMIT,
    data,
  };
}

export function createWorflowTeamFail(error: any) {
  return {
    type: CREATE_WORKFLOWTEAM_FAIL,
    error,
  };
}

export function updateWorflowTeam(data: WorkflowTeam) {
  return {
    type: UPDATE_WORKFLOWTEAM,
    data,
  };
}

export function updateWorflowTeamCommit(data: WorkflowTeam) {
  return {
    type: UPDATE_WORKFLOWTEAM_COMMIT,
    data,
  };
}

export function updateWorflowTeamFail(error: any) {
  return {
    type: UPDATE_WORKFLOWTEAM_FAIL,
    error,
  };
}

export function deleteWorflowTeam(data: WorkflowTeam) {
  return {
    type: DELETE_WORKFLOWTEAM,
    data,
  };
}

export function deleteWorflowTeamCommit(data: WorkflowTeam, nested: any) {
  return {
    type: DELETE_WORKFLOWTEAM_COMMIT,
    data,
  };
}

export function deleteWorflowTeamFail(error: any) {
  return {
    type: DELETE_WORKFLOWTEAM_FAIL,
    error,
  };
}

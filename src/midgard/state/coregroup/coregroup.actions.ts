import { CoreGroup } from './coregroup.model';

export const LOAD_DATA_COREGROUP = 'LOAD_DATA_COREGROUP';
export const LOAD_DATA_COREGROUP_COMMIT = 'LOAD_DATA_COREGROUP_COMMIT';
export const LOAD_DATA_COREGROUP_FAIL = 'LOAD_DATA_COREGROUP_FAIL';

export const CREATE_COREGROUP = 'CREATE_COREGROUP';
export const CREATE_COREGROUP_COMMIT = 'CREATE_COREGROUP_COMMIT';
export const CREATE_COREGROUP_FAIL = 'CREATE_COREGROUP_FAIL';

export const UPDATE_COREGROUP = 'UPDATE_COREGROUP';
export const UPDATE_COREGROUP_COMMIT = 'UPDATE_COREGROUP_COMMIT';
export const UPDATE_COREGROUP_FAIL = 'UPDATE_COREGROUP_FAIL';

export const DELETE_COREGROUP = 'DELETE_COREGROUP';
export const DELETE_COREGROUP_COMMIT = 'DELETE_COREGROUP_COMMIT';
export const DELETE_COREGROUP_FAIL = 'DELETE_COREGROUP_FAIL';

export function loadCoregroupData() {
  return {
    type: LOAD_DATA_COREGROUP,
  };
}

export function loadCoregroupDataCommit(data: CoreGroup[]) {
  return {
    type: LOAD_DATA_COREGROUP_COMMIT,
    data,
  };
}

export function loadCoregroupDataFail(error: any) {
  return {
    type: LOAD_DATA_COREGROUP_FAIL,
    error,
  };
}

export function createCoreGroup(data: CoreGroup) {
  return {
    type: CREATE_COREGROUP,
    data,
  };
}

export function createCoreGroupCommit(data: CoreGroup) {
  return {
    type: CREATE_COREGROUP_COMMIT,
    data,
  };
}

export function createCoreGroupFail(error: any) {
  return {
    type: CREATE_COREGROUP_FAIL,
    error,
  };
}

export function updateCoreGroup(data: CoreGroup) {
  return {
    type: UPDATE_COREGROUP,
    data,
  };
}

export function updateCoreGroupCommit(data: CoreGroup) {
  return {
    type: UPDATE_COREGROUP_COMMIT,
    data,
  };
}

export function updateCoreGroupFail(error: any) {
  return {
    type: UPDATE_COREGROUP_FAIL,
    error,
  };
}

export function deleteCoreGroup(data: CoreGroup) {
  return {
    type: DELETE_COREGROUP,
    data,
  };
}

export function deleteCoreGroupCommit(data: CoreGroup) {
  return {
    type: DELETE_COREGROUP_COMMIT,
    data,
  };
}

export function deleteCoreGroupFail(error: any) {
  return {
    type: DELETE_COREGROUP_FAIL,
    error,
  };
}

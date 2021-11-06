import { CoreUser } from './coreuser.model';

export const LOAD_DATA_COREUSER = 'LOAD_DATA_COREUSER';
export const LOAD_DATA_COREUSER_COMMIT = 'LOAD_DATA_COREUSER_COMMIT';
export const LOAD_DATA_COREUSER_FAIL = 'LOAD_DATA_COREUSER_FAIL';

export const CREATE_COREUSER = 'CREATE_COREUSER';
export const CREATE_COREUSER_COMMIT = 'CREATE_COREUSER_COMMIT';
export const CREATE_COREUSER_FAIL = 'CREATE_COREUSER_FAIL';

export const UPDATE_COREUSER = 'UPDATE_COREUSER';
export const UPDATE_COREUSER_COMMIT = 'UPDATE_COREUSER_COMMIT';
export const UPDATE_COREUSER_FAIL = 'UPDATE_COREUSER_FAIL';

export const DELETE_COREUSER = 'DELETE_COREUSER';
export const DELETE_COREUSER_COMMIT = 'DELETE_COREUSER_COMMIT';
export const DELETE_COREUSER_FAIL = 'DELETE_COREUSER_FAIL';

export function loadCoreuserData() {
  return {
    type: LOAD_DATA_COREUSER,
  };
}

export function loadCoreuserDataCommit(data: CoreUser[]) {
  return {
    type: LOAD_DATA_COREUSER_COMMIT,
    data,
  };
}

export function loadCoreuserDataFail(error: any) {
  return {
    type: LOAD_DATA_COREUSER_FAIL,
    error,
  };
}

export function createCoreUser(data: CoreUser) {
  return {
    type: CREATE_COREUSER,
    data,
  };
}

export function createCoreUserCommit(data: CoreUser) {
  return {
    type: CREATE_COREUSER_COMMIT,
    data,
  };
}

export function createCoreUserFail(error: any) {
  return {
    type: CREATE_COREUSER_FAIL,
    error,
  };
}

export function updateCoreUser(data: CoreUser) {
  return {
    type: UPDATE_COREUSER,
    data,
  };
}

export function updateCoreUserCommit(data: CoreUser) {
  return {
    type: UPDATE_COREUSER_COMMIT,
    data,
  };
}

export function updateCoreUserFail(error: any) {
  return {
    type: UPDATE_COREUSER_FAIL,
    error,
  };
}

export function deleteCoreUser(data: CoreUser) {
  return {
    type: DELETE_COREUSER,
    data,
  };
}

export function deleteCoreUserCommit(data: CoreUser) {
  return {
    type: DELETE_COREUSER_COMMIT,
    data,
  };
}

export function deleteCoreUserFail(error: any) {
  return {
    type: DELETE_COREUSER_FAIL,
    error,
  };
}

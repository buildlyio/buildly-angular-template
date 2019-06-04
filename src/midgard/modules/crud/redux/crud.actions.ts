export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_COMMIT = 'LOAD_DATA_COMMIT';
export const LOAD_DATA_FAIL = 'LOAD_DATA_FAIL';

export const CREATE = 'CREATE';
export const CREATE_COMMIT = 'CREATE_COMMIT';
export const CREATE_FAIL = 'CREATE_FAIL';

export const UPDATE = 'UPDATE';
export const UPDATE_COMMIT = 'UPDATE_COMMIT';
export const UPDATE_FAIL = 'UPDATE_FAIL';

export const DELETE = 'DELETE';
export const DELETE_COMMIT = 'DELETE_COMMIT';
export const DELETE_FAIL = 'DELETE_FAIL';

export function loadData(endpoint: string) {
  return {
    type: LOAD_DATA,
    endpoint
  };
}

export function loadDataCommit(endpoint: string, data: any[]) {
  return {
    type: LOAD_DATA_COMMIT,
    endpoint,
    data
  };
}

export function loadDataFail(endpoint, error) {
  return {
    type: LOAD_DATA_FAIL,
    endpoint,
    error
  };
}

export function createData(data) {
  return {
    type: CREATE,
    data
  };
}

export function createDataCommit(data) {
  return {
    type: CREATE_COMMIT,
    data
  };
}

export function createDataFail(error) {
  return {
    type: CREATE_FAIL,
    error
  };
}

export function updateData(data) {
  return {
    type: UPDATE,
    data
  };
}

export function updateDataCommit(data) {
  return {
    type: UPDATE_COMMIT,
    data
  };
}

export function updateDataFail(error) {
  return {
    type: UPDATE_FAIL,
    error
  };
}

export function deleteData(data) {
  return {
    type: DELETE,
    data
  };
}

export function deleteDataCommit(data) {
  return {
    type: DELETE_COMMIT,
    data
  };
}

export function deleteDataFail(error) {
  return {
    type: DELETE_FAIL,
    error
  };
}

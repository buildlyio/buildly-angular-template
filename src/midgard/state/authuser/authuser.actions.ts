import {CoreUser} from '../coreuser/coreuser.model';
export const LOAD_AUTHUSER = 'LOAD_AUTHUSER';
export const LOAD_AUTHUSER_COMMIT = 'LOAD_AUTHUSER_COMMIT';
export const LOAD_AUTHUSER_FAIL = 'LOAD_AUTHUSER_FAIL';
export const UPDATE_AUTHUSER = 'UPDATE_AUTHUSER';
export const UPDATE_AUTHUSER_COMMIT = 'UPDATE_AUTHUSER_COMMIT';
export const UPDATE_AUTHUSER_FAIL = 'UPDATE_AUTHUSER_FAIL';

export function loadAuthUser() {
  return {
    type: LOAD_AUTHUSER,
  };
}

export function loadAuthUserCommit(data: CoreUser) {
  return {
    type: LOAD_AUTHUSER_COMMIT,
    data
  };
}

export function loadAuthUserFail(data) {
  return {
    type: LOAD_AUTHUSER_FAIL,
    data
  };
}

export function updateAuthUser(data: CoreUser) {
  return {
    type: UPDATE_AUTHUSER,
    data
  };
}

export function updateAuthUserCommit(data: CoreUser) {
  return {
    type: UPDATE_AUTHUSER_COMMIT,
    data
  };
}

export function updateAuthUserFail(data) {
  return {
    type: UPDATE_AUTHUSER_FAIL,
    data
  };
}

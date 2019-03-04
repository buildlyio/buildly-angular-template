import {
  CREATE_COREUSER, createCoreUserCommit, createCoreUserFail,
  DELETE_COREUSER,
  deleteCoreUserCommit, deleteCoreUserFail, LOAD_DATA_COREUSER, loadCoreuserDataCommit, loadCoreuserDataFail, UPDATE_COREUSER, updateCoreUser, updateCoreUserCommit,
  updateCoreUserFail
} from './coreuser.actions';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '@src/midgard/state/action.type';
import { reduxObservable } from '@src/midgard/modules/store';
import { environment } from '@env/environment';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_COREUSER action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadCoreuserDataEpic = action$ => {
  return action$.pipe(
    redux.ofType(LOAD_DATA_COREUSER),
    switchMap((action: any) => {
      return httpService.makeRequest('get', `${environment.API_URL}/coreuser/`).pipe(
        // If successful, dispatch success action with result
        map(res => loadCoreuserDataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadCoreuserDataFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when CREATE_COREUSER action is dispatched
 * @param {Observable} action$ - the current action
 */
const createCoreUserEpic = action$ => {
  return action$.pipe(
    redux.ofType(CREATE_COREUSER),
    switchMap((action: Action) => {
      return httpService.makeRequest('post', `${environment.API_URL}/coreuser/`, action.data).pipe(
        // If successful, dispatch success action with result
        map(res => createCoreUserCommit(action.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(createCoreUserFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when UPDATE_COREUSER action is dispatched
 * @param {Observable} action$ - the current action
 */
const updateCoreUserEpic = action$ => {
  return action$.pipe(
    redux.ofType(UPDATE_COREUSER),
    switchMap((action: Action) => {
      return httpService.makeRequest('put', `${environment.API_URL}/coreuser/${action.data.id}/`, action.data, true).pipe(
        // If successful, dispatch success action with result
        map(res => updateCoreUserCommit(action.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(updateCoreUserFail(error)))
      );
    })
  );
};

/**
 * this is here to handle asynchronous actions and will be triggered when DELETE_COREUSER action is dispatched
 * @param {Observable} action$ - the current action
 */
const deleteCoreUserEpic = action$ => {
  return action$.pipe(
    redux.ofType(DELETE_COREUSER),
    switchMap((action: Action) => {
      return httpService.makeRequest('delete', `${environment.API_URL}/coreuser/${action.data.id}/`, {}, true).pipe(
        // If successful, dispatch success action with result
        map(res => deleteCoreUserCommit(action.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(deleteCoreUserFail(error)))
      );
    })
  );
};

// combine the modules epics into one
export const coreUserEpics  = redux.combineEpics(
  loadCoreuserDataEpic,
  createCoreUserEpic,
  updateCoreUserEpic,
  deleteCoreUserEpic
);

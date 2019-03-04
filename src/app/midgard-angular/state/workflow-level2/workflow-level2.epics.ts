
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import {
  loadWorkflowLevel2Commit, loadWorkflowLevel2Fail, LOAD_ALL_WORKFLOWLEVEL2, loadOneWorkflowLevel2Commit, loadOneWorkflowLevel2Fail,
  updateWorkflowLevel2Commit, updateWorkflowLevel2Fail, deleteWorkflowLevel2Commit, deleteWorkflowLevel2Fail, LOAD_ONE_WORKFLOWLEVEL2,
  UPDATE_WORKFLOWLEVEL2, DELETE_WORKFLOWLEVEL2, CREATE_WORKFLOWLEVEL2, createWorkflowLevel2Commit, createWorkflowLevel2Fail
} from '@libs/midgard-angular/src/lib/state/workflow-level2/workflow-level2.actions';
import { Action } from '@libs/midgard-angular/src/lib/state/action.type';


const httpService = new HttpService();

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  const loadAllWorkflowLevel2Epic = action$ => {
    return action$.pipe(
      redux.ofType(LOAD_ALL_WORKFLOWLEVEL2),
      switchMap((action: Action) => {
        return httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/`).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadWorkflowLevel2Commit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadWorkflowLevel2Fail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  const loadOneWorkflowLevel2Epic = action$ => {
    return action$.pipe(
      redux.ofType(LOAD_ONE_WORKFLOWLEVEL2),
      switchMap((action: Action) => {
        return httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/${action.id}/`).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadOneWorkflowLevel2Commit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadOneWorkflowLevel2Fail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  const createWorkflowLevel2Epic = action$ => {
    return action$.pipe(
      redux.ofType(CREATE_WORKFLOWLEVEL2),
      switchMap((action: Action) => {
        return httpService.makeRequest('post', `${environment.API_URL}/workflowlevel2/`, action.data).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => {
            return createWorkflowLevel2Commit(res.data, action.nested);
          }),
          // If request fails, dispatch failed action
          catchError((error) => of(createWorkflowLevel2Fail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  const updateWorkflowLevel2Epic = action$ => {
    return action$.pipe(
      redux.ofType(UPDATE_WORKFLOWLEVEL2),
      switchMap((action: Action) => {
        return httpService.makeRequest('put', `${environment.API_URL}/workflowlevel2/${action.data.id}/`, action.data).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => {
            return updateWorkflowLevel2Commit(res.data, action.nested);
          }),
          // If request fails, dispatch failed action
          catchError((error) => of(updateWorkflowLevel2Fail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  const deleteWorkflowLevel2Epic = action$ => {
    return action$.pipe(
      redux.ofType(DELETE_WORKFLOWLEVEL2),
      switchMap((action: Action) => {
        return httpService.makeRequest('delete', `${environment.API_URL}/workflowlevel2/${action.data.id}`).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => {
            return deleteWorkflowLevel2Commit(action.data, action.nested)
          }),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteWorkflowLevel2Fail(error)))
        );
      })
    );
  }

// combine the modules epics into one
export const workflowlevel2Epics = redux.combineEpics(
    loadAllWorkflowLevel2Epic,
    loadOneWorkflowLevel2Epic,
    updateWorkflowLevel2Epic,
    deleteWorkflowLevel2Epic,
    createWorkflowLevel2Epic,
  );

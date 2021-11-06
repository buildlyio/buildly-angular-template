import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import {
  loadWorkflowLevel2Commit, loadWorkflowLevel2Fail, LOAD_ALL_WORKFLOWLEVEL2, loadOneWorkflowLevel2Commit, loadOneWorkflowLevel2Fail,
  updateWorkflowLevel2Commit, updateWorkflowLevel2Fail, deleteWorkflowLevel2Commit, deleteWorkflowLevel2Fail, LOAD_ONE_WORKFLOWLEVEL2,
  UPDATE_WORKFLOWLEVEL2, DELETE_WORKFLOWLEVEL2, CREATE_WORKFLOWLEVEL2, createWorkflowLevel2Commit, createWorkflowLevel2Fail,
} from '@src/midgard/state/workflow-level2/workflow-level2.actions';
import { Action } from '@src/midgard/state/action.type';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkflowLevel2Epics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAllWorkflowLevel2Epic = (action$: any) => action$.pipe(
    redux.ofType(LOAD_ALL_WORKFLOWLEVEL2),
    switchMap(() => this.httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/`).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => loadWorkflowLevel2Commit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(loadWorkflowLevel2Fail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadOneWorkflowLevel2Epic = (action$: any) => action$.pipe(
    redux.ofType(LOAD_ONE_WORKFLOWLEVEL2),
    switchMap((action: Action) => this.httpService.makeRequest('get', `${environment.API_URL}/workflowlevel2/${action.id}/`).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => loadOneWorkflowLevel2Commit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(loadOneWorkflowLevel2Fail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  createWorkflowLevel2Epic = (action$: any) => action$.pipe(
    redux.ofType(CREATE_WORKFLOWLEVEL2),
    switchMap((action: Action) => this.httpService.makeRequest('post', `${environment.API_URL}/workflowlevel2/`, action.data).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => createWorkflowLevel2Commit(res.data, action.nested)),
      // If request fails, dispatch failed action
      catchError((error) => of(createWorkflowLevel2Fail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateWorkflowLevel2Epic = (action$: any) => action$.pipe(
    redux.ofType(UPDATE_WORKFLOWLEVEL2),
    switchMap((action: Action) => this.httpService.makeRequest('put', `${environment.API_URL}/workflowlevel2/${action.data.id}/`, action.data).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => updateWorkflowLevel2Commit(res.data, action.nested)),
      // If request fails, dispatch failed action
      catchError((error) => of(updateWorkflowLevel2Fail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_WORKFLOWLEVEL2 action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteWorkflowLevel2Epic = (action$: any) => action$.pipe(
    redux.ofType(DELETE_WORKFLOWLEVEL2),
    switchMap((action: Action) => this.httpService.makeRequest('delete', `${environment.API_URL}/workflowlevel2/${action.data.id}`).pipe(
      // If successful, dispatch success action with result
      map(() => deleteWorkflowLevel2Commit(action.data, action.nested)),
      // If request fails, dispatch failed action
      catchError((error) => of(deleteWorkflowLevel2Fail(error))),
    )),
  );

  constructor(
    private httpService: HttpService,
  ) {
    return redux.combineEpics(
      this.loadAllWorkflowLevel2Epic,
      this.loadOneWorkflowLevel2Epic,
      this.createWorkflowLevel2Epic,
      this.updateWorkflowLevel2Epic,
      this.deleteWorkflowLevel2Epic,
    );
  }
}

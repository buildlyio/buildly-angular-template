import { HttpService } from '@src/midgard/modules/http/http.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { Action } from '@src/midgard/state/action.type';
import { reduxObservable } from '@src/midgard/modules/store';
import {
  CREATE_WORKFLOWTEAM, createWorflowTeamCommit, createWorflowTeamFail, DELETE_WORKFLOWTEAM, deleteWorflowTeamCommit, deleteWorflowTeamFail,
  LOAD_ALL_WORKFLOWTEAMS, LOAD_ONE_WORKFLOWTEAM, loadOneWorflowTeamCommit, loadOneWorflowTeamFail, loadWorflowTeamsCommit,
  loadWorflowTeamsFail, UPDATE_WORKFLOWTEAM, updateWorflowTeamCommit, updateWorflowTeamFail
} from '@src/midgard/state/workflow-team/workflow-team.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkflowTeamEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ALL_WORKFLOWTEAM action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAllWorflowTeamsEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ALL_WORKFLOWTEAMS),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}workflowteam/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => loadWorflowTeamsCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadWorflowTeamsFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_WORKFLOWTEAM action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadOneWorflowTeamEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(LOAD_ONE_WORKFLOWTEAM),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}workflowteam/${action.id}/`, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => loadOneWorflowTeamCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadOneWorflowTeamFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_WORKFLOWTEAM action is dispatched
   * @param {Observable} action$ - the current action
   */
  createWorflowTeamEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(CREATE_WORKFLOWTEAM),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}workflowteam/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => createWorflowTeamCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(createWorflowTeamFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_WORKFLOWTEAM action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateWorflowTeamEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(UPDATE_WORKFLOWTEAM),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('put', `${environment.API_URL}workflowteam/${action.data.id}/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => updateWorflowTeamCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(updateWorflowTeamFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_WORKFLOWTEAM action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteWorflowTeamEpic = action$ => {
    return action$.pipe(
      reduxObservable.ofType(DELETE_WORKFLOWTEAM),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}workflowteam/${action.data.id}/`, true).pipe(
          // If successful, dispatch success action with result
          map(res => deleteWorflowTeamCommit(action.data, action.nested)),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteWorflowTeamFail(error)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.loadAllWorflowTeamsEpic,
      this.loadOneWorflowTeamEpic,
      this.updateWorflowTeamEpic,
      this.deleteWorflowTeamEpic,
      this.createWorflowTeamEpic
    );
  }
}

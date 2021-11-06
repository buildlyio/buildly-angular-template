import { HttpService } from '@midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '@midgard/state/action.type';
import { reduxObservable } from '@midgard/modules/store';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  CREATE_COREGROUP,
  createCoreGroupCommit,
  createCoreGroupFail,
  DELETE_COREGROUP,
  deleteCoreGroupCommit,
  deleteCoreGroupFail,
  LOAD_DATA_COREGROUP,
  loadCoregroupDataCommit,
  loadCoregroupDataFail,
  UPDATE_COREGROUP,
  updateCoreGroupCommit,
  updateCoreGroupFail,
} from './coregroup.actions';

@Injectable()
export class CoreGroupEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_COREGROUP action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadCoregroupDataEpic = (action$: any) => action$.pipe(
    redux.ofType(LOAD_DATA_COREGROUP),
    switchMap(() => this.httpService.makeRequest('get', `${environment.API_URL}/coregroups/`).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => loadCoregroupDataCommit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(loadCoregroupDataFail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_COREGROUP action is dispatched
   * @param {Observable} action$ - the current action
   */
  createCoreGroupEpic = (action$: any) => action$.pipe(
    redux.ofType(CREATE_COREGROUP),
    switchMap((action: Action) => this.httpService.makeRequest('post', `${environment.API_URL}/coregroups/`, action.data).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => createCoreGroupCommit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(createCoreGroupFail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_COREGROUP action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateCoreGroupEpic = (action$: any) => action$.pipe(
    redux.ofType(UPDATE_COREGROUP),
    switchMap((action: Action) => this.httpService.makeRequest('patch', `${environment.API_URL}/coregroups/${action.data.id}/`, action.data, true).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => updateCoreGroupCommit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(updateCoreGroupFail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_COREGROUP action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteCoreGroupEpic = (action$: any) => action$.pipe(
    redux.ofType(DELETE_COREGROUP),
    switchMap((action: Action) => this.httpService.makeRequest('delete', `${environment.API_URL}/coregroups/${action.data.id}/`, null, true).pipe(
      // If successful, dispatch success action with result
      map(() => deleteCoreGroupCommit(action.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(deleteCoreGroupFail(error))),
    )),
  );

  constructor(
    private httpService: HttpService,
  ) {
    return reduxObservable.combineEpics(
      this.loadCoregroupDataEpic,
      this.createCoreGroupEpic,
      this.updateCoreGroupEpic,
      this.deleteCoreGroupEpic,
    );
  }
}

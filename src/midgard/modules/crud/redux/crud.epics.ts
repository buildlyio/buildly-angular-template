import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '@src/midgard/state/action.type';
import { reduxObservable } from '@src/midgard/modules/store';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import { LOAD_DATA, loadDataCommit, loadDataFail } from './crud.actions';
import { CrudAction } from './crud.action.model';

@Injectable()
export class CoreUserEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_COREUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadDataEpic = action$ => {
    return action$.pipe(
      redux.ofType(LOAD_DATA),
      switchMap((action: CrudAction) => {
        return this.httpService.makeRequest('get', `${environment.API_URL}${action.endpoint}/`).pipe(
          // If successful, dispatch success action with result
          map(res => loadDataCommit(action.endpoint, res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(loadDataFail(action.endpoint, error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CREATE_COREUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  createCoreUserEpic = action$ => {
    return action$.pipe(
      redux.ofType(CREATE_COREUSER),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}/coreuser/`, action.data).pipe(
          // If successful, dispatch success action with result
          map(res => createCoreUserCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(createCoreUserFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_COREUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateCoreUserEpic = action$ => {
    return action$.pipe(
      redux.ofType(UPDATE_COREUSER),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('patch', `${environment.API_URL}/coreuser/${action.data.id}/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map(res => updateCoreUserCommit(res.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(updateCoreUserFail(error)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when DELETE_COREUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  deleteCoreUserEpic = action$ => {
    return action$.pipe(
      redux.ofType(DELETE_COREUSER),
      switchMap((action: Action) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}/coreuser/${action.data.id}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => deleteCoreUserCommit(action.data)),
          // If request fails, dispatch failed action
          catchError((error) => of(deleteCoreUserFail(error)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.loadDataEpic,
      this.createCoreUserEpic,
      this.updateCoreUserEpic,
      this.deleteCoreUserEpic,
    );
  }
}


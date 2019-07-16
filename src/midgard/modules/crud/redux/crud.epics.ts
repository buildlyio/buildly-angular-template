import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '@src/midgard/state/action.type';
import { reduxObservable } from '@src/midgard/modules/store';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';
import {
  CRUD_CREATE, CRUD_DELETE, CRUD_LOAD_DATA, CRUD_UPDATE, crudCreateCommit, crudCreateFail, crudDeleteCommit, crudDeleteFail,
  crudLoadDataCommit,
  crudLoadDataFail,
  crudUpdateCommit,
  crudUpdateFail
} from './crud.actions';
import { CrudAction } from './crud.action.model';

@Injectable()
export class CrudEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when CRUD_LOAD_DATA action is dispatched
   * @param {Observable} action$ - the current action
   */
  crudLoadDataEpic = action$ => {
    return action$.pipe(
      redux.ofType(CRUD_LOAD_DATA),
      switchMap((action: CrudAction) => {
        console.log(action.endpoint);
        return this.httpService.makeRequest('get', `${environment.API_URL}${action.endpoint}`, null, false).pipe(
          // If successful, dispatch success action with result
          map(res => crudLoadDataCommit(res.data, action.endpoint, action.idProp, action.dataProp)),
          // If request fails, dispatch failed action
          catchError((error) => of(crudLoadDataFail(error, action.endpoint)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CRUD_CREATE action is dispatched
   * @param {Observable} action$ - the current action
   */
  crudCreateEpic = action$ => {
    return action$.pipe(
      redux.ofType(CRUD_CREATE),
      switchMap((action: CrudAction) => {
        return this.httpService.makeRequest('post', `${environment.API_URL}${action.endpoint}`, action.data).pipe(
          // If successful, dispatch success action with result
          map(res => crudCreateCommit(res.data, action.endpoint, action.idProp, action.dataProp)),
          // If request fails, dispatch failed action
          catchError((error) => of(crudCreateFail(error, action.endpoint)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CRUD_UPDATE action is dispatched
   * @param {Observable} action$ - the current action
   */
  crudUpdateEpic = action$ => {
    return action$.pipe(
      redux.ofType(CRUD_UPDATE),
      switchMap((action: CrudAction) => {
        return this.httpService.makeRequest('patch', `${environment.API_URL}${action.endpoint}${action.data.id}/`, action.data, true).pipe(
          // If successful, dispatch success action with result
          map(res => crudUpdateCommit(res.data, action.endpoint, action.idProp, action.dataProp)),
          // If request fails, dispatch failed action
          catchError((error) => of(crudUpdateFail(error, action.endpoint)))
        );
      })
    );
  }

  /**
   * this is here to handle asynchronous actions and will be triggered when CRUD_DELETE action is dispatched
   * @param {Observable} action$ - the current action
   */
  crudDeleteEpic = action$ => {
    return action$.pipe(
      redux.ofType(CRUD_DELETE),
      switchMap((action: CrudAction) => {
        return this.httpService.makeRequest('delete', `${environment.API_URL}${action.endpoint}${action.data.id}/`, {}, true).pipe(
          // If successful, dispatch success action with result
          map(res => crudDeleteCommit(res.data, action.endpoint, action.idProp, action.dataProp)),
          // If request fails, dispatch failed action
          catchError((error) => of(crudDeleteFail(error, action.endpoint)))
        );
      })
    );
  }

  constructor(
    private httpService: HttpService
  ) {
    return reduxObservable.combineEpics(
      this.crudLoadDataEpic,
      this.crudCreateEpic,
      this.crudUpdateEpic,
      this.crudDeleteEpic,
    );
  }
}


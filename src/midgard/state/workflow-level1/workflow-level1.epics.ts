import {
  LOAD_DATA_WORKFLOWLEVEL1, loadWorkflowLevel1DataCommit, loadWorkflowLevel1DataFail,
} from '@src/midgard/state/workflow-level1/workflow-level1.actions';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { reduxObservable } from '@src/midgard/modules/store';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkflowLevel1Epics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_WORKFLOWLEVEL1 action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadWorkflowLevel1DataEpic = (action$: any) => action$.pipe(
    redux.ofType(LOAD_DATA_WORKFLOWLEVEL1),
    switchMap(() => this.httpService.makeRequest('get', `${environment.API_URL}/workflowlevel1/`).pipe(
      // If successful, dispatch success action with result
      map((res: any) => loadWorkflowLevel1DataCommit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(loadWorkflowLevel1DataFail(error))),
    )),
  );

  constructor(
    private httpService: HttpService,
  ) {
    return reduxObservable.combineEpics(
      this.loadWorkflowLevel1DataEpic,
    );
  }
}

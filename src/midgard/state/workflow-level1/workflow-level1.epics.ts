import {
  LOAD_DATA_WORKFLOWLEVEL1, loadWorkflowLevel1DataCommit, loadWorkflowLevel1DataFail
} from '@src/midgard/state/workflow-level1/workflow-level1.actions';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';

const httpService = new HttpService();

/**
 * this is here to handle asynchronous actions and will be triggered when LOAD_DATA_WORKFLOWLEVEL1 action is dispatched
 * @param {Observable} action$ - the current action
 */
const loadWorkflowLevel1DataEpic = action$ => {
  return action$.pipe(
    redux.ofType(LOAD_DATA_WORKFLOWLEVEL1),
    switchMap((action: any) => {
      return httpService.makeRequest('get', `${environment.API_URL}/workflowlevel1/`).pipe(
        // If successful, dispatch success action with result
        map(res => loadWorkflowLevel1DataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadWorkflowLevel1DataFail(error)))
      );
    })
  );
};

// combine the modules epics into one
export const workflowlevel1Epics  = redux.combineEpics(loadWorkflowLevel1DataEpic);

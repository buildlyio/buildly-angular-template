import {
  LOAD_DATA_WORKFLOWLEVEL1, LOAD_DATA_WORKFLOWLEVEL2, loadWorkflowLevel1DataCommit, loadWorkflowLevel1DataFail,
  loadWorkflowLevel2DataCommit, loadWorkflowLevel2DataFail
} from '@libs/midgard/src/lib/state/midgard.actions';
import { HttpService } from '@libs/midgard/src/lib/modules/http-module/http.service';
import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs';

const loadWorkflowLevel1DataEpic = action$ => {
  const httpService = new HttpService();
  return action$.pipe(
    ofType(LOAD_DATA_WORKFLOWLEVEL1),
    switchMap((action: any) => {
      return httpService.makeRequest('get', 'https://dev.toladata.io/api/workflowlevel1/').pipe(
        // If successful, dispatch success action with result
        map(res => loadWorkflowLevel1DataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadWorkflowLevel1DataFail(error)))
      );
    })
  );
};

const loadWorkflowLevel2DataEpic = action$ => {
  const httpService = new HttpService();
  return action$.pipe(
    ofType(LOAD_DATA_WORKFLOWLEVEL2),
    switchMap((action: any) => {
      return httpService.makeRequest('get', 'https://dev.toladata.io/api/workflowlevel2/').pipe(
        // If successful, dispatch success action with result
        map(res => loadWorkflowLevel2DataCommit(res.data)),
        // If request fails, dispatch failed action
        catchError((error) => of(loadWorkflowLevel2DataFail(error)))
      );
    })
  );
};

export const midgardEpics  = combineEpics(loadWorkflowLevel1DataEpic, loadWorkflowLevel2DataEpic);

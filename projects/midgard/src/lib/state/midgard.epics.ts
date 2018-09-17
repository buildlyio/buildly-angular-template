import {
  LOAD_DATA_WORKFLOWLEVEL1, loadWorkflowLevel1DataCommit, loadWorkflowLevel1DataFail
} from '@libs/midgard/src/lib/state/midgard.actions';
import { HttpService } from '@libs/midgard/src/lib/modules/http-module/http.service';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/internal/operators';
import { of } from 'rxjs';

export const loadWorkflowLevel1DataEpic = action$ => {
  const httpService = new HttpService();
  return action$.pipe(
    ofType(LOAD_DATA_WORKFLOWLEVEL1),
    switchMap((action: any) => {
      return httpService.makeRequest('get', 'https://dev.toladata.io/api/workflowlevel1/').pipe(
        // If successful, dispatch success action with result
        map(res => of(loadWorkflowLevel1DataCommit(res.data))),
        // If request fails, dispatch failed action
        catchError((error) => of(loadWorkflowLevel1DataFail(error)))
      );
    })
  );
}

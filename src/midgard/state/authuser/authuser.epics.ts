
import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { Action } from '@src/midgard/state/action.type';
import {
  LOAD_AUTHUSER, loadAuthUserCommit, loadAuthUserFail, UPDATE_AUTHUSER,
  updateAuthUserCommit, updateAuthUserFail
} from '@src/midgard/state/authuser/authuser.actions';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';

const httpService = new HttpService();
const oauthService = new OAuthService();

  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_AUTHUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  const loadAuthUserEpic = action$ => {
    return action$.pipe(
      redux.ofType(LOAD_AUTHUSER),
      switchMap((action: Action) => {
        return httpService.makeRequest('get', `${environment.API_URL}/oauthuser/`).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => {
            if (res.data.core_user) { // if not admin user
              oauthService.setOauthUser(res.data.core_user); // store the user to localstorage
              return loadAuthUserCommit(res.data.core_user);
            } else {
              oauthService.setOauthUser(JSON.stringify(res.data)); // store the user to localstorage
              return loadAuthUserCommit(res.data);
            }
          }),
          // If request fails, dispatch failed action
          catchError((error) => of(loadAuthUserFail(error)))
        );
      })
    );
  };

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_AUTHUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  const updateAuthUserEpic = action$ => {
    return action$.pipe(
      redux.ofType(UPDATE_AUTHUSER),
      switchMap((action: Action) => {
        return httpService.makeRequest('put', `${environment.API_URL}/coreuser/${action.data.id}/`, action.data).pipe(
          // If successful, dispatch success action with result
          map((res: Action) => {
            return updateAuthUserCommit(res.data);
          }),
          // If request fails, dispatch failed action
          catchError((error) => of(updateAuthUserFail(error)))
        );
      })
    );
  };

// combine the modules epics into one
export const authUserEpics = redux.combineEpics(
    loadAuthUserEpic,
    updateAuthUserEpic,
  );

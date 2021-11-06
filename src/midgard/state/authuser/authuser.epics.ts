import { HttpService } from '@src/midgard/modules/http/http.service';
import { redux } from 'midgard-core';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '@env/environment';
import { Action } from '@src/midgard/state/action.type';
import {
  LOAD_AUTHUSER, loadAuthUserCommit, loadAuthUserFail, UPDATE_AUTHUSER,
  updateAuthUserCommit, updateAuthUserFail,
} from '@src/midgard/state/authuser/authuser.actions';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthUserEpics {
  /**
   * this is here to handle asynchronous actions and will be triggered when LOAD_ONE_AUTHUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  loadAuthUserEpic = (action$: any) => action$.pipe(
    redux.ofType(LOAD_AUTHUSER),
    switchMap(() => this.httpService.makeRequest('get', `${environment.API_URL}/oauthuser/`).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => {
        if (res.data.core_user) { // if not admin user
          this.oauthService.setOauthUser(res.data.core_user); // store the user to localstorage
          return loadAuthUserCommit(res.data.core_user);
        }
        this.oauthService.setOauthUser(JSON.stringify(res.data)); // store the user to localstorage
        return loadAuthUserCommit(res.data);
      }),
      // If request fails, dispatch failed action
      catchError((error) => of(loadAuthUserFail(error))),
    )),
  );

  /**
   * this is here to handle asynchronous actions and will be triggered when UPDATE_AUTHUSER action is dispatched
   * @param {Observable} action$ - the current action
   */
  updateAuthUserEpic = (action$: any) => action$.pipe(
    redux.ofType(UPDATE_AUTHUSER),
    switchMap((action: Action) => this.httpService.makeRequest('patch', `${environment.API_URL}/coreuser/${action.data.id}/`, action.data).pipe(
      // If successful, dispatch success action with result
      map((res: Action) => updateAuthUserCommit(res.data)),
      // If request fails, dispatch failed action
      catchError((error) => of(updateAuthUserFail(error))),
    )),
  );

  constructor(
    private httpService: HttpService,
    private oauthService: OAuthService,
  ) {
    return redux.combineEpics(
      this.loadAuthUserEpic,
      this.updateAuthUserEpic,
    );
  }
}

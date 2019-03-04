import { Injectable } from '@angular/core';
import { oauth } from 'midgard-core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class OAuthService {
  constructor() {}
  /**
   * authenticates user using oauth password flow
   * @param {{usename: string; password: string}} credentials
   * @returns {Observable<any>}
   */
  public authenticateWithPasswordFlow(credentials: { usename: string, password: string }): Observable<any> {
    const oauthOptions = {
      clientId: environment.OAUTH_CLIENT_ID,
      tokenUrl: environment.OAUTH_TOKEN_URL
    };
    return oauth.authenticateWithCredentials(credentials, oauthOptions);
  }

  /**
   * gets the oauthuser from localstorage
   * @returns {} oauthUser
   */
  public getOauthUser() {
    const oauthUser = JSON.parse(localStorage.getItem('oauthUser'));
    if (oauthUser) {
      return oauthUser;
    }
  }

  /**
   * sets the oauthuser in localstorage
   * @param {string} oauthUser - oauth user data
   * @returns {string}
   */
  public setOauthUser(oauthUser) {
    localStorage.setItem('oauthUser', JSON.stringify(oauthUser));
    if (oauthUser) {
      return oauthUser;
    }
  }

  /**
   * Checks, whether there is a valid access_token.
   */
  public hasValidAccessToken(): boolean {
    if (this.getAccessToken()) {
      const expiresAt = localStorage.getItem('expires_at');
      const now = new Date();
      if (expiresAt && parseInt(expiresAt, 10) < now.getTime()) {
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * sets access token in the local storage and adds expires_at key that indicates the token expiration unix timestamp
   * @param token - the token response
   */
  public setAccessToken(token) {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      if (token.expires_in) {
        const expiresInMilliSeconds = token.expires_in * 1000;
        const now = new Date();
        const expiresAt = now.getTime() + expiresInMilliSeconds;
        localStorage.setItem('expires_at', expiresAt.toString());
        localStorage.setItem('token_stored_at', now.toString());
      }
    }
  }

  /**
   * logs out the user by deleteing his access token from the storage
   */
  public logout() {
    if (this.getAccessToken()) {
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('token_stored_at');
    }
  }

  /**
   * Returns the current access_token.
   */
  public getAccessToken(): string {
    const tokenObj = JSON.parse(localStorage.getItem('token'));
    if (tokenObj) {
      return tokenObj.access_token;
    }
  }

  /**
   * Returns the current JWT token.
   */
  public getJwtToken(): string {
    const tokenObj = JSON.parse(localStorage.getItem('token'));
    if (tokenObj) {
      return tokenObj.access_token_jwt;
    }
  }
}

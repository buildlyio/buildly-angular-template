import { Injectable } from '@angular/core';
import { http } from 'midgard-core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';

@Injectable()
export class HttpService {
  private oauthService = new OAuthService();

  /**
   * function to send a Http request to the API
   * @param {string} method - Http verb of the request (GET,POST,PUT,...)
   * @param {string} url - url endpoint to send request to e.g ‘contacts’
   * @param {any} body - data of the request
   * @param {booelan} useJwt - boolean to check if we want to use JWT or not
   * @param {string} contentType - type of content to be requested
   * @param {string} responseType - the expected response type from the server
   * @returns {Observable} - response of the request or error
   */
  makeRequest(
    method: string, url: string, body: any = null, useJwt?: boolean, contentType?: string, responseType?: string,
  ): Observable<any> {
    let token;
    let tokenType;
    if (useJwt) {
      tokenType = 'JWT';
      token = this.oauthService.getJwtToken();
    } else {
      tokenType = 'Bearer';
      token = this.oauthService.getAccessToken();
    }
    const headers = {
      Authorization: `${tokenType} ${token}`,
      'Content-Type': contentType || 'application/json',
    };
    const options = {
      method,
      data: body,
      headers,
      responseType: responseType || null,
    };
    return http.request(url, options).pipe(
      retry(3),
      catchError((error) => this.handleError(error)),
    );
  }

  /**
   * handles request errors
   * @param error - request error
   * @returns observable of the error
   */
  private handleError(error) {
    if (error) {
      return throwError('Server error');
    }
  }
}

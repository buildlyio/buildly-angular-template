import { Injectable } from '@angular/core';
import { http } from 'midgard-core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { retry } from 'rxjs/internal/operators';

@Injectable()
export class HttpService {
  /**
   * @description - function to send a Http request to the API
   * @param {string} method - Http verb og the request (GET,POST,PUT,...)
   * @param {string} url - url endpoint to send request to e.g ‘contacts’
   * @param {any} body - data of the request
   * @returns {Observable} - response of the request or error
   */
  makeRequest(method: string, url: string, body = null): Observable<any> {
    const headers = {'Authorization' : 'Bearer GfR6vIHG0zTWaJle6TjNXvYUrjDn6g'};
    const options = {
      method: 'get',
      data: body,
      headers: headers,
    };
    return http.request(url, options).pipe(
      retry(3),
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * @description - handles request errors
   * @param error - request error
   * @returns observable of the error
   */
  private handleError(error) {
    return throwError(error.json() || 'Server error');
  }
}

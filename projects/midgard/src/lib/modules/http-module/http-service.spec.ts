import { http } from 'midgard-core';
import { HttpService } from '@libs/midgard/src/lib/modules/http-module/http.service';
import { Observable } from 'rxjs';

let httpService;

describe( 'HttpService', () => {
  beforeEach( () => {
    spyOn(http, 'request').and.callThrough();
    httpService = new HttpService();
  });

  it('should make a request and return an observable', () => {
    const headers = {'Authorization' : 'Bearer GfR6vIHG0zTWaJle6TjNXvYUrjDn6g'};
    const options = {
      method: 'get',
      data: {},
      headers: headers,
    };
    httpService.makeRequest('get', 'test.com', {});
    expect(http.request).toHaveBeenCalledWith('test.com', options);
    expect(httpService.makeRequest('get', 'test.com', {})).toEqual(jasmine.any(Observable));

  });
});

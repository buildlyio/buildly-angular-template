import { http } from 'midgard-core';
import { HttpService } from '@libs/midgard-angular/src/lib/modules/http/http.service';

let httpService;

describe( 'HttpService', () => {
  beforeEach( () => {
    spyOn(http, 'request').and.callThrough();
    httpService = new HttpService();
    spyOn(httpService.oauthService, 'getAccessToken').and.returnValue('GfR6vIHG0zTWaJle6TjNXvYUrjDn6g');
  });

  it('should make a request and return an observable', () => {
    const headers = {'Authorization' : 'Bearer GfR6vIHG0zTWaJle6TjNXvYUrjDn6g', 'Content-Type': 'application/json' };
    const options = {
      method: 'get',
      data: {},
      headers,
      responseType: null
    };
    httpService.makeRequest('get', 'test.com', {});
    expect(http.request).toHaveBeenCalledWith('test.com', options);
  });
});

import { oauth } from 'midgard-core';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';
import { environment } from '@env/environment';

let oauthService;
const windowSpy: any = window;

describe( 'OAuthService', () => {
  beforeEach( () => {
    spyOn(oauth, 'authenticateWithCredentials').and.callThrough();
    oauthService = new OAuthService();
  });

  it('should call authenticateWithCredentials method from midgard-core oauth', () => {
    const credentials = {
      username: 'test',
      password: 'test'
    };
    const oauthOptions = {
      clientId: environment.OAUTH_CLIENT_ID ,
      tokenUrl: environment.OAUTH_TOKEN_URL
    };
    oauthService.authenticateWithPasswordFlow(credentials)
    expect(oauth.authenticateWithCredentials).toHaveBeenCalledWith(credentials, oauthOptions);
  });

  it('should remove the token and the expiration date from localstorage', () => {
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(oauthService, 'getAccessToken').and.returnValue('fake_token');
    oauthService.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('expires_at');
    expect(localStorage.removeItem).toHaveBeenCalledWith('token_stored_at');
  });

  it('should get the access token from localstorage and return a string', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({'access_token': 'faketoken', 'expires_in': 36000}));
    oauthService.getAccessToken();
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(oauthService.getAccessToken()).toEqual(jasmine.any(String));
  });

  it('should save the access token, the expiration date and the date the token stored to the localstorage', () => {
    const localStorageSpy: any = localStorage;
    spyOn(localStorageSpy, 'setItem').and.callThrough();
    const fakeToken = {accessToken : 'faketoken', expires_in: 36000};
    const fakeDate = new Date(2018, 10, 2, 10, 19);
    spyOn(windowSpy, 'Date').and.callFake(function() {
      return fakeDate;
    });
    oauthService.setAccessToken(fakeToken);
    const expiresInMilliSeconds = fakeToken.expires_in * 1000;
    const expiresAt = fakeDate.getTime() + expiresInMilliSeconds;
    expect(localStorageSpy.setItem.calls.allArgs()).toEqual([
      ['token', JSON.stringify(fakeToken)],
      ['expires_at', expiresAt.toString()],
      ['token_stored_at', fakeDate.toString()]
    ]);
  });

  it('should return false if the current date is after the token expiration date', () => {
    spyOn(oauthService, 'getAccessToken').and.returnValue('fake_token');
    spyOn(localStorage, 'getItem').and.returnValue('1539710869804'); // 16/10/2018 @ 10:19am (UTC) token expiration date
    const currentDate = new Date(2018, 10, 2, 10, 19); // 02/11/2018 current date
    spyOn(windowSpy, 'Date').and.callFake(function() {
      return currentDate;
    });
    oauthService.hasValidAccessToken();
    expect(oauthService.hasValidAccessToken()).toBeFalsy();
  });

  it('should return true if the current date is before the token expiration date', () => {
    spyOn(oauthService, 'getAccessToken').and.returnValue('fake_token');
    spyOn(localStorage, 'getItem').and.returnValue('1539710869804'); // 16/10/2018 @ 10:19am (UTC) token expiration date
    const currentDate = new Date(2018, 8, 2, 10, 19); // 02/09/2018 current date
    spyOn(windowSpy, 'Date').and.callFake(function() {
      return currentDate;
    });
    oauthService.hasValidAccessToken();
    expect(oauthService.hasValidAccessToken()).toBeTruthy();
  });
});

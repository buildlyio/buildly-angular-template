import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {} from 'jasmine';

@Injectable()
export class StubService {}

@Injectable()
export class OAuthStubService {
  public authenticateWithPasswordFlow(credentials: { usename: string, password: string }): Observable<any> {
    return of({
      access_token: '7HbtAwFy5p3pMbJhM7ts4fZE6lYrbv',
      expires_in: 36000,
      refresh_token: 'MCXKM4GLqbwgXZYgxI1IedCxUTcwPy',
      scope: 'read write',
      token_type: 'Bearer'
    });
  }
  public getOauthUser(): any {
    return {
      core_user: {
        name: 'test',
        core_user_uuid: 'uuid'
      }
    };
  }
  public hasValidAccessToken(): boolean {
    return true;
  }
  public saveAccessToken(token) {}
  public logout() {}
  public getAccessToken(): string {
    return 'fake_token';
  }
  public setAccessToken(): void {}
}

@Injectable()
export class StoreStub<T> {
  public observable = {
    pipe: () => {
      return of({data: ''});
    }
  }
  public dispatch (action: any) {
    return action;
  }
}

@Injectable()
export class MatDialogStub {
  public open (modal, config) {
    return true;
  }
}

@Injectable()
export class MatSnackBarStub {
  public open (message, action, config) {
    return true;
  }
}

@Injectable()
export class FileSavingStubService {
  public downloadDocument (document) {
    return true;
  }
}

@Injectable()
export class ImageLoadingStubService {
  public loadImage (image: Document, fileType: string = 'image/png', thumbnail: boolean = false) {
    return true;
  }
}

export const routerStubValue = {
  navigate: jasmine.createSpy('navigate')
};

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();
  snapshot: any = {
    children: [{ params: { id: 1 }}],
    pathFromRoot: [{ params: { id: 1 }}, { params: { id: 1 }}, { params: { id: 1 }}, { params: { id: 1 }}],
    paramMap: {
      get: () => 'new'
    }
  };
  parent = {
    params: this.params,
    parent : {
      params: this.params,
      snapshot: {
        children: [{ params: { id: 1 }}],
        pathFromRoot: [{ params: { id: 1 }}, { params: { id: 1 }}, { params: { id: 1 }}, { params: { id: 1 }}],
        paramMap: {
          get: () => '3'
        }
      }
    }
  };

  private _testParams: {};

  get testParams() { return this._testParams; }
  get queryParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
}


import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { OAuthStubService } from '@src/midgard/testing-utilities/stubs';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@midgard/modules/store/store';
import { StoreMock } from '@midgard/modules/store/store-mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MidgardCrudModule } from '@midgard/modules/crud/crud.module';
import { Router } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router;
  let oauthService;
  const mockUser = {
      id: 5,
      first_name: 'test',
      last_name: 'testlast',
      email: 'test@test.com',
      is_active: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardCrudModule, RouterTestingModule],
      declarations: [ UserComponent ],
      providers: [
        // {provide: OAuthService , useClass: OAuthStubService},
        {provide: Store, useClass: StoreMock},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.crud.rows = { data: mockUser};
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should call crud updateItem function with the updated value of the row if the user updates a field in the row', async(() => {
    spyOn(component.crud, 'updateItem');
    const editedObj = {
      value: 'a@gmail.com',
      elementName: 'email'
    };
    component.updateUser(editedObj);
    expect(component.crud.updateItem).toHaveBeenCalledWith({id: 5, email: 'a@gmail.com'});
  }));

  it('should call the components updateName function if the edited value is the name', () => {
    spyOn(component, 'updateName');
    const editedObj = {
      value: 'newname',
      elementName: 'name'
    };
    component.updateUser(editedObj);
    expect(component.updateName).toHaveBeenCalledWith('newname');
  });

  it('should split the fullname to first name and last name and call crud updateItem function with the separated names', () => {
    spyOn(component.crud, 'updateItem');
    component.updateName('First Last');
    expect(component.crud.updateItem).toHaveBeenCalledWith({id: 5, first_name: 'First', last_name: 'Last'});
  });

  it('should navigate to the logout page', () => {
    spyOn(router, 'navigate');
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call the oauthservice logout mehod', () => {
    oauthService = TestBed.get(OAuthService);
    spyOn(oauthService, 'logout');
    component.logout();
    expect(oauthService.logout).toHaveBeenCalled();
  });
});

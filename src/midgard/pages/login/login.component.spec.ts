import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OAuthService } from '@src/midgard/modules/oauth/oauth.service';
import {
  ActivatedRouteStub,
  OAuthStubService,
  routerStubValue,
  StoreStub
} from '@src/midgard/testing-utilities/stubs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormValidationHelper } from '@src/midgard/modules/form/form.validation.helper';
import { Store } from '@src/midgard/modules/store/store';
import { HttpService } from '@src/midgard/modules/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store;
  let router;
  let oauthService;

  const fakeCredentails = {
    username: 'username',
    password: 'password'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: OAuthService, useClass: OAuthStubService },
        { provide: Store, useClass: StoreStub },
        { provide: Router, useValue: routerStubValue },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        FormValidationHelper,
        HttpService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    oauthService = TestBed.get(OAuthService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with username and password fields', () => {
    component.initForm();

    expect(component.loginForm.controls['username']).toBeDefined();
    expect(component.loginForm.controls['password']).toBeDefined();
  });

  it('should call authenticate on submit', () => {
    component.loginForm.patchValue(fakeCredentails);
    component.loginForm.updateValueAndValidity();
    fixture.detectChanges();
    spyOn(component, 'authenticate');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.authenticate).toHaveBeenCalled();
  });

  it('should authenticate user to the app and save token to storage', async () => {
    component.appEntryPoint = '/dashboard';
    component.loginForm.patchValue(fakeCredentails);
    component.loginForm.updateValueAndValidity();
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    spyOn(oauthService, 'setAccessToken');
    component.authenticate();
    expect(oauthService.setAccessToken).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([component.appEntryPoint]);
  });
});

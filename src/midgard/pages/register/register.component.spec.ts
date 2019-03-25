import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import {
  ActivatedRouteStub,
  routerStubValue,
  StoreStub
} from '@src/midgard/testing-utilities/stubs';
import { Store } from '@src/midgard/modules/store/store';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormValidationHelper } from '@src/midgard/modules/form/form.validation.helper';
import { HttpService } from '@src/midgard/modules/http/http.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store;
  let router;
  let activatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should create registerForm', () => {
    component.initForm();
    expect(component.registerForm).toBeDefined();
  });

  it('should initialize form with fields', () => {
    component.initForm();
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['username']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
    expect(component.registerForm.controls['organization_name']).toBeDefined();
    expect(component.registerForm.controls['first_name']).toBeDefined();
    expect(component.registerForm.controls['last_name']).toBeDefined();
  });

  it('should dispatch create core user on register and navigate to login', () => {
    spyOn(store, 'dispatch');
    component.initForm();
    component.register();
    expect(store.dispatch).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

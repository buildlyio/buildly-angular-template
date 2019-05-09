import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GraphQlService } from '../graphql/graphql.service';
import {
  ActivatedRouteStub, MatSnackBarStub, routerStubValue, StoreStub,
  StubService
} from '../../testing-utilities/stubs';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '../store/store';
import { of } from 'rxjs';
import { getAllWorkflowLevel1s } from '../../state/workflow-level1/workflow-level1.selectors';
import { MatSnackBar } from '@angular/material';
import { FormValidationHelper } from '@src/midgard/modules/form/form.validation.helper';
import { StoreMock } from '../store/store-mock';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let activatedRoute: ActivatedRoute;
  let store;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ FormComponent ],
      providers: [
        {provide: Store, useClass: StoreMock},
        {provide: Router, useValue: routerStubValue},
        {provide: GraphQlService, useClass: StubService},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub},
        {provide: MatSnackBar, useClass: MatSnackBarStub},
        FormValidationHelper
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.formFields = [
      {label: 'Name', controlName: 'name', type: 'text', validators: ['required'] },
      {label: 'Description', controlName: 'description', type: 'text', validators: ['required'] }
    ];
    component.loadAction = 'AN_ACTION';
    // component.useGraphQl = false;
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store.observable, 'pipe').and.returnValue(of([{id: '4'}]));
    fixture.detectChanges();
  });


  // it('should build the reactive form from the given input formFields', () => {
  //   component.selector = null;
  //   component.buildForm();
  //   expect(component.detailsForm).toBeDefined();
  //   expect(component.detailsForm).toEqual(jasmine.any(FormGroup));
  //   expect(component.detailsForm.controls['name']).toBeDefined();
  //   expect(component.detailsForm.controls['description']).toBeDefined();
  // });
});

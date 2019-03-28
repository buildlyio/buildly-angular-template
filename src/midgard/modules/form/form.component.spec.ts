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
import { By } from '@angular/platform-browser';

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
        {provide: Store, useClass: StoreStub},
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
    component.currentItemId = '4';
    // component.useGraphQl = false;
    component.selector = getAllWorkflowLevel1s;
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(store.observable, 'pipe').and.returnValue(of([{id: '4'}]));
    fixture.detectChanges();
  });

  it('isNewItem should return true if the route parameter is new', () => {
    expect(component.isNewItemCheck()).toBeTruthy();
  });

  it('should build the reactive form from the given input formFields', () => {
    component.buildForm();
    expect(component.detailsForm).toBeDefined();
    expect(component.detailsForm).toEqual(jasmine.any(FormGroup));
    expect(component.detailsForm.controls['name']).toBeDefined();
    expect(component.detailsForm.controls['description']).toBeDefined();
  });

  it('should get item from redux store if the useGraphQl flag is set to false and the item is not new', () => {
    spyOn(component, 'isNewItemCheck').and.returnValue(false);
    spyOn(component, 'getDataFromStore').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.getDataFromStore).toHaveBeenCalled();
  });

  it('should dispatch the input loadAction with the currentItemId', () => {
    component.getDataFromStore();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: component.loadAction,
      id: component.currentItemId
    });
  });

  it('should request to update an item if it is not new', () => {
    spyOn(component, 'isNewItemCheck').and.returnValue(false);
    component.updateAction = 'UPDATE_WORKFLOWLEVEL2';
    fixture.detectChanges();
    const action = {
      type: component.updateAction,
      data: component.detailsForm.value,
    };
    component.updateItem(component.detailsForm.value);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should request to create an item if it is new', () => {
    spyOn(component, 'isNewItemCheck').and.returnValue(true);
    component.createAction = 'CREATE_WORKFLOWLEVEL2';
    fixture.detectChanges();
    const action = {
      type: component.createAction,
      data: component.detailsForm.value,
    };
    component.createItem(component.detailsForm.value);
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should go to list page when back button is clicked', () => {
    component.backButtonText = 'Back';
    component.backRoute = '/back-route';
    fixture.detectChanges();
    const backbutton = fixture.debugElement.queryAll(By.css('fj-button'))[0];
    backbutton.nativeElement.click();
    component.goToListPage();
    expect(router.navigate).toHaveBeenCalledWith([component.backRoute]);
  });
});

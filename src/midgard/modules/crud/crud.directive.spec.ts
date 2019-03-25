import { CrudDirective } from './crud.directive';
import { ChangeDetectionStrategy, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreMock } from '@src/midgard/modules/store/store-mock';
import { Store } from '@src/midgard/modules/store/store';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { GraphQlService } from '@src/midgard/modules/graphql/graphql.service';
import { MidgardStoreModule } from '@src/midgard/modules/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarStub } from '@src/midgard/testing-utilities/stubs';
import { FormBuilder } from '@angular/forms';
import { getAllWorkflowLevel1s } from '@src/midgard/state/workflow-level1/workflow-level1.selectors';
import { By } from '@angular/platform-browser';
import { mockAppointmentsForSelectors } from '@src/midgard/testing-utilities/mock.data';

describe('CrudDirective', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let component: ContainerComponent;
  let element: DebugElement;
  let crudDirective: CrudDirective;
  let store: Store<any>;
  let graphQlBackend: ApolloTestingController;
  let graphQlService: GraphQlService;

  // Test actions
  const loadAction = 'A_TEST_ACTION';
  const createAction = 'CREATE_ITEM_ACTION';
  const deleteAction = 'DELETE_ITEM_ACTION';
  const updateAction = 'UPDATE_ITEM_ACTION';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MidgardStoreModule.forRoot(),
        ApolloTestingModule,
        RouterTestingModule
      ],
      declarations: [CrudDirective, ContainerComponent],
      providers: [
        FormBuilder,
        GraphQlService,
        { provide: Store, useClass: StoreMock },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    graphQlBackend = TestBed.get(ApolloTestingController);
    graphQlService = TestBed.get(GraphQlService);

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    component.loadAction = loadAction;
    component.createAction = createAction;
    component.deleteAction = deleteAction;
    component.updateAction = updateAction;
    component.loadActionGraphQl = 'LOAD_GRAPHQL';
    component.selector = getAllWorkflowLevel1s;
    fixture.detectChanges();
    element = fixture.debugElement.query(By.css('div'));
    crudDirective = element.injector.get<CrudDirective>(CrudDirective);
  });

  it('should create an instance', () => {
    expect(crudDirective).toBeTruthy();
  });

  it('should get data from the store', () => {
    spyOn(store, 'dispatch');

    crudDirective.getDataFromStore();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: loadAction
    });
  });

  it('should dispatch create action when create item is called', () => {
    const item = mockAppointmentsForSelectors[1];
    const index = 3;
    spyOn(store, 'dispatch');
    crudDirective.createItem(item, index);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: createAction,
      data: item,
      index: index
    });
  });

  it('should dispatch delete action when create item is called', () => {
    const item = mockAppointmentsForSelectors[1];
    spyOn(store, 'dispatch');
    crudDirective.deleteItem(item);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: deleteAction,
      data: item,
    });
  });
});

@Component({
  selector: 'app-test-container',
  template: `
    <div
      mgCrud
      [loadAction]="loadAction"
      [createAction]="createAction"
      [deleteAction]="deleteAction"
      [updateAction]="updateAction"
      [selector]="selector"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class ContainerComponent {
  // Actions
  public loadAction;
  public createAction;
  public deleteAction;
  public updateAction;
  public loadActionGraphQl;
  public selector;
}

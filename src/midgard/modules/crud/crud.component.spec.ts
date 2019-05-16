import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { GraphQlService } from '@src/midgard/modules/graphql/graphql.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { getAllWorkflowLevel1s } from '@src/midgard/state/workflow-level1/workflow-level1.selectors';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarStub } from '@src/midgard/testing-utilities/stubs';
import { MidgardStoreModule } from '../store/store.module';
import { StoreMock } from '../store/store-mock';
import { Store } from '../store/store';
import { mockAppointmentsForSelectors } from '../../testing-utilities/mock.data';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  let graphQlBackend: ApolloTestingController;
  let graphQlService: GraphQlService;
  let store: Store<any>;

  // Test actions
  const loadAction = 'A_TEST_ACTION';
  const createAction = 'CREATE_ITEM_ACTION';
  const deleteAction = 'DELETE_ITEM_ACTION';
  const updateAction = 'UPDATE_ITEM_ACTION';


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, RouterTestingModule, ScrollDispatchModule],
      declarations: [ CrudComponent, FilterByNamePipe ],
      providers: [
        GraphQlService,
        {provide: Store, useClass: StoreMock},
        {provide: MatSnackBar, useClass: MatSnackBarStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    graphQlBackend = TestBed.get(ApolloTestingController);
    graphQlService = TestBed.get(GraphQlService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    component.loadAction = loadAction;
    component.createAction = createAction;
    component.deleteAction = deleteAction;
    component.updateAction = updateAction;
    component.dataSelector = getAllWorkflowLevel1s;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete action and emit itemDeleted event when delete item is called', () => {
    const item = mockAppointmentsForSelectors[0];

    component.rows = mockAppointmentsForSelectors;
    spyOn(store, 'dispatch');
    spyOn(component.itemDeleted, 'emit');

    component.deleteItem(item);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: deleteAction,
      data: item
    });
    expect(component.itemDeleted.emit).toHaveBeenCalled();
  });

  it('should dispatch create action and emit itemCreated when create item is called', () => {
    const item = mockAppointmentsForSelectors[1];
    const index = 3;

    component.rows = mockAppointmentsForSelectors;
    spyOn(store, 'dispatch');
    spyOn(component.itemCreated, 'emit');

    component.createItem(item, index);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: createAction,
      data: item,
      index: index
    });
    expect(component.itemCreated.emit).toHaveBeenCalled();
  });

  it('should dispatch update action and emit itemUpdated when update is called', () => {
    const item = mockAppointmentsForSelectors[1];

    component.rows = mockAppointmentsForSelectors;
    spyOn(store, 'dispatch');
    spyOn(component.itemUpdated, 'emit');

    component.updateItem(item);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: updateAction,
      data: item,
    });
    expect(component.itemUpdated.emit).toHaveBeenCalled();
  });

  it('should change view to selected view', () => {
    component.tableOptions = {
      columns: ['column_1', 'column_2']
    };
    component.ngOnInit();
    component.selectView('list');

    expect(component.view).toBe('list');
  });

  it('should get data from the store', () => {
    spyOn(store, 'dispatch');

    component.getDataFromStore();

    expect(store.dispatch).toHaveBeenCalledWith({
      type: loadAction
    });

  });
});

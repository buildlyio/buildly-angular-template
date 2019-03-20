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


describe('CrudComponent', () => {
  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  let graphQlBackend: ApolloTestingController;
  let graphQlService: GraphQlService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot(), ApolloTestingModule, RouterTestingModule],
      declarations: [ CrudComponent ],
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
    component.loadAction = 'A_TEST_ACTION';
    component.loadActionGraphQl = 'LOAD_GRAPHQL';
    component.selector = getAllWorkflowLevel1s;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from graphQl if the useGraphQl flag is set to true', () => {
    spyOn(component, 'getDataUsingGraphQl').and.callThrough();
    component.useGraphQl = true;
    component.graphQlQuery = `
        {
          workflowlevel1s {
            id
            name
            workflowlevel2 {
              id
              name
            }
          }
        }
      `;
    component.ngOnInit();
    expect(component.getDataUsingGraphQl).toHaveBeenCalled();
  });

  it('should send a graphQl query', () => {
    component.useGraphQl = true;
    component.graphQlVariables = {};
    component.graphQlQuery = `fake_query`;
    component.graphQlModel = 'testModel';
    fixture.detectChanges();
    const mockResult = {
      data: {
          testModel: 'test'
      }
    };
    spyOn(graphQlService, 'query').and.returnValue(of(mockResult));
    component.getDataUsingGraphQl();
    expect(graphQlService.query).toHaveBeenCalledWith(component.graphQlQuery, component.graphQlVariables);
  });

});

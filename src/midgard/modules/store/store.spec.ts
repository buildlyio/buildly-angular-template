import { select, Store } from '@src/midgard/modules/store/store';
import { Observable } from 'rxjs';
import { redux } from 'midgard-core';
import { loadWorkflowLevel1DataCommit } from '@src/midgard/state/workflow-level1/workflow-level1.actions';
import { getAllWorkflowLevel1s } from '@src/midgard/state/workflow-level1/workflow-level1.selectors';
import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MidgardStoreModule } from './store.module';
import { StoreMock } from './store-mock';

let store;

describe( 'Store', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MidgardStoreModule.forRoot()],
      providers: [
        {provide: Store, useClass: StoreMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(redux, 'combineReducers').and.callThrough();
    spyOn(redux, 'createStore').and.callThrough();
    store = TestBed.get(Store);
  });

  it('should create an instance of redux store', () => {
    expect(store).toBeDefined();
  });

  it('should be an object with dispatch, getState and observable properties', () => {
    expect(store).toEqual(jasmine.any(Object));
    expect(store.dispatch).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.observable).toBeDefined();
  });

  it('store.observable should return an observable', () => {
    expect(store).toEqual(jasmine.any(Object));
    expect(store.observable).toEqual(jasmine.any(Observable));
  });

  it('select operator should return an observable', () => {
    expect(store.observable.pipe(select(getAllWorkflowLevel1s))).toEqual(jasmine.any(Observable));
  });

  it('select operator should return portion of the state on subscribing to it', (done) => {
    store.dispatch(loadWorkflowLevel1DataCommit([{id: 0, name: 'test name'}]));
    store.observable.pipe(select(getAllWorkflowLevel1s)).subscribe( res => {
      expect(res).toBeDefined();
      expect(res).toEqual([{id: 0, name: 'test name'}]);
      done();
    });
  });
});

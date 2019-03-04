import { select, Store } from '@libs/midgard-angular/src/lib/modules/store/store';
import { Observable } from 'rxjs';
import { redux } from 'midgard-core';
import { loadWorkflowLevel1DataCommit } from '@libs/midgard-angular/src/lib/state/workflow-level1/workflow-level1.actions';
import { getAllWorkflowLevel1s } from '@libs/midgard-angular/src/lib/state/workflow-level1/workflow-level1.selectors';
import { map } from 'rxjs/internal/operators';

let store;

describe( 'Store', () => {
  beforeEach(() => {
    spyOn(redux, 'combineReducers').and.callThrough();
    spyOn(redux, 'createStore').and.callThrough();
    store = new Store();
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
    store.dispatch(loadWorkflowLevel1DataCommit({name: 'test name'}));
    store.observable.pipe(select(getAllWorkflowLevel1s), map((res: any) => res.data)).subscribe( res => {
      expect(res).toBeDefined();
      expect(res).toEqual({name: 'test name'});
      done();
    });
  });
});

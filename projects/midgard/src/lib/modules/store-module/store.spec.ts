import { select, Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { Observable } from 'rxjs';
import { redux } from 'midgard-core';
import { loadWorkflowLevel1DataCommit } from '@libs/midgard/src/lib/state/midgard.actions';

let store;

describe( 'Store', () => {
  beforeEach( () => {
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

  it('should combine reducers', () => {
    expect(redux.combineReducers).toHaveBeenCalled();
  });

  it('should call createStore', () => {
    expect(redux.createStore).toHaveBeenCalled();
  });

  it('select operator should return an observable', () => {
    expect(store.observable.pipe(select('midgardReducer', 'workflowLevel1'))).toEqual(jasmine.any(Observable));
  });

  it('select operator should return portion of the state on subscribing to it', (done) => {
    store.observable.pipe(select('midgardReducer', 'workflowLevel1')).subscribe( data => {
      expect(data).toBeDefined();
      expect(data).toEqual({name: 'test name'});
      done();
    });
    store.dispatch(loadWorkflowLevel1DataCommit({name: 'test name'}));
  });
});

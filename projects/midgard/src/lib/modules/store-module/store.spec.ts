import { Store } from '@libs/midgard/src/lib/modules/store-module/store';
import { Observable } from 'rxjs';
import { redux } from 'midgard-core';

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
});

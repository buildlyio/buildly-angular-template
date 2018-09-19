import { Store } from '@libs/midgard/src/lib/modules/store-module/store';

let store;

describe( 'Store', () => {
  beforeEach( () => {
    store = new Store();
  });
  it('should create an instance of redux store', () => {
    expect(store).toBeDefined();
  });
});

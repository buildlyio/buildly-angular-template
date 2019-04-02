import { addAll, deleteMultiple, deleteOne, upsertOne } from '@src/midgard/modules/store/reducer.utils';


describe('loadAll', () => {

  it('should update the state with all the elements returned by the action and loaded should be true', () => {
    const mockState = {
      data: [],
      loaded: false
    };
    const mockAction = {
      type: 'LOAD_ALL_ACTION',
      data: [{id: 1, name: 'test'}, {id: 2, name: 'test2'}]
    };
    const expectedResult = {
      data: [{id: 1, name: 'test'}, {id: 2, name: 'test2'}],
      loaded: true
    };
    expect(addAll(mockState, mockAction)).toEqual(expectedResult);
  });
});

describe('upsertOne', () => {

  it('should insert the new item returned by the action to the state if the item doesnt exist', () => {
    const mockState = {
      data: [],
      loaded: true,
      created: true
    };
    const mockAction = {
      type: 'UPDATE_ACTION',
      data: {id: 1 , name: 'test' }
    };
    const expectedResult = {
      data: [{id: 1 , name: 'test' }],
      loaded: true,
      created: true
    };
    expect(upsertOne(mockState, mockAction, 'id')).toEqual(expectedResult);
  });

  it('should update the item, if it exists in the state', () => {
    const mockState = {
      data: [{id: 1 , name: 'test' }],
      loaded: true,
      updated: true
    };
    const mockAction = {
      type: 'UPDATE_ACTION',
      data: {id: 1 , name: 'example' }
    };
    const expectedResult = {
      data: [{id: 1 , name: 'example' }],
      loaded: true,
      updated: true
    };
    expect(upsertOne(mockState, mockAction, 'id')).toEqual(expectedResult);
  });

  it('should add the item under the specified data property if it doesn t exist', () => {
    const mockState = {
      data: {
        results: [{id: 1, name: 'test'}]
      },
      loaded: true,
      created: true
    };
    const mockAction = {
      type: 'CREATE_ACTION',
      data: {id: 2 , name: 'example' }
    };
    const expectedResult = {
      data: {
        results: [{id: 1, name: 'test'}, {id: 2 , name: 'example' }]
      },
      loaded: true,
      created: true
    };
    expect(upsertOne(mockState, mockAction, 'id', 'results')).toEqual(expectedResult);
  });

  it('should update the item under the specified data property if it exists', () => {
    const mockState = {
      data: {
        results: [{id: 1, name: 'test'}]
      },
      loaded: true,
      updated: true
    };
    const mockAction = {
      type: 'UPDATE_ACTION',
      data: {id: 1 , name: 'example' }
    };
    const expectedResult = {
      data: {
        results: [{id: 1, name: 'example'}]
      },
      loaded: true,
      updated: true
    };
    expect(upsertOne(mockState, mockAction, 'id', 'results')).toEqual(expectedResult);
  });
});


describe('deleteOne', () => {

  it('should delete the item returned by the action from the state if the item exists', () => {
    const mockState = {
      data: [{id: 1 , name: 'test' }],
      deleted: false
    };
    const mockAction = {
      type: 'DELETE_ACTION',
      data: {id: 1 , name: 'test' }
    };
    const expectedResult = {
      data: [],
      deleted: true
    };
    expect(deleteOne(mockState, mockAction, 'id')).toEqual(expectedResult);
  });

  it('should delete the item returned by the action from the specified state data array if the item exists ', () => {
    const mockState = {
      data: { results: [{id: 1 , name: 'test' }]},
      deleted: false
    };
    const mockAction = {
      type: 'DELETE_ACTION',
      data: {id: 1 , name: 'test' }
    };
    const expectedResult = {
      data: { results: []},
      deleted: true
    };
    expect(deleteOne(mockState, mockAction, 'id', 'results')).toEqual(expectedResult);
  });

  it('should return the old state if the item doesnt exist', () => {
    const mockState = {
      data: [],
      deleted: true
    };
    const mockAction = {
      type: 'DELETE_ACTION',
      data: {id: 1 , name: 'test' }
    };
    expect(deleteOne(mockState, mockAction, 'id')).toEqual(mockState);
  });
});


describe('deleteMultiple', () => {

  it('should delete the items returned by the action from the state if they exists', () => {
    const mockState = {
      data: [{id: 1 , name: 'test' }, {id: 3, name: 'justanothername'}],
      deleted: true
    };
    const mockAction = {
      type: 'DELETE_ACTION',
      data: [{id: 1 , name: 'test' }, {id: 3, name: 'justanothername'}]
    };
    const expectedResult = {
      data: [],
      deleted: true
    };
    expect(deleteMultiple(mockState, mockAction, 'id')).toEqual(expectedResult);
  });
});

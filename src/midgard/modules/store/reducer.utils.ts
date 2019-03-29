/**
 * it will add the loaded element to the state
 * @param state - the current state
 * @param action - the returned action
 * @returns {{data; dataLoaded: boolean}}
 */
import { Action } from '../../state/action.type';

export const addAll = (state, action: Action) => {
  return {...state, data: action.data, loaded: true};
};

/**
 * it inserts an item to the state if it does not exist otherwise it will update the item with the passed action data
 * @param state - the current state
 * @param action - the returned action
 * @param {string} dataProp - property that stores the data
 * @param {string} idProp - unique identifier property to check if element exists
 * @returns {any}
 */
export const upsertOne = (state, action: Action, idProp: string, dataProp?: string) => {
  const dataObj = {};
  let dataArr = [];
  if (dataProp) {
    dataArr = state.data[dataProp];
  } else {
    dataArr = state.data;
  }
  if (Array.isArray(dataArr)) {
    // insert if item does not exist
    if (!dataArr.find( item => item[idProp] === action.data[idProp])) {
      if (action.index) {
          const stateDataCopy = [...dataArr];
          stateDataCopy.splice(action.index, 0, action.data);
          if (dataProp) {
            dataObj[dataProp] = stateDataCopy;
            state = {...state, data: dataObj, loaded: true, created: true};
          } else {
            state = {...state, data: stateDataCopy, loaded: true, created: true};
          }
      } else {
        if (dataProp) {
          dataObj[dataProp] = [...dataArr, action.data];
          state = {...state, data: dataObj, loaded: true, created: true};
        } else {
          state = {...state, data: [...dataArr, action.data], loaded: true, created: true};
        }
      }
      return state;
    } else { // update if item exists
      if (dataProp) {
        dataObj[dataProp] = dataArr.map (item => {
          if (item[idProp] === action.data[idProp]) {
            return action.data;
          } else {
            return item;
          }
        });
        return {...state, data: dataObj, loaded: true, updated: true};
      } else {
        return {...state, data: dataArr.map (item => {
            if (item[idProp] === action.data[idProp]) {
              return action.data;
            } else {
              return item;
            }
          }), loaded: true, updated: true};
      }
    }
  } else {
    if (!state.data) {
      return {data : action.data, created: true, loaded: true};
    } else {
      return {data : action.data, updated: true};
    }
  }
};

/**
 * it deletes an from to the state if it does not exist otherwise it will return the curren state
 * @param state - the current state
 * @param action - the returned action
 * @param {string} idProp - unique identifier property to check if element exists
 * @param {string} dataProp - property that stores the data
 * @returns {any}
 */
export const deleteOne = (state, action: Action, idProp: string, dataProp?: string) => {
  const dataObj = {};
  let dataArr = [];
  if (dataProp) {
    dataArr = state.data[dataProp].filter (item => item[idProp] !== action.data[idProp]);
    dataObj[dataProp] = dataArr;
    return {...state, data: dataObj , deleted: true};
  } else {
    dataArr = state.data.filter (item => item[idProp] !== action.data[idProp]);
    return {...state, data: dataArr, deleted: true};
  }
};

/**
 * updates nested data in one reducer only one level of nested data supported
 * @param state
 * @param action
 * @returns {{}}
 */
export const updateNested = (state, action) => {
  const parentIndex = state.data.findIndex( dataItem => dataItem.id.toString() === action.data[action.nested.parent].toString());
  if (parentIndex !== -1) {
    state.data[parentIndex][action.nested.key].forEach( (item, index) => {
      if (item.id.toString() === action.data.id.toString()) {
        state.data[parentIndex][action.nested.key][index] = action.data;
      } else {
        return state;
      }
    });
  }
  return {...state};
};

/**
 * inserts nested data in one reducer only one level of nested data supported
 * @param state
 * @param action
 * @returns {{}}
 */
export const addNested = (state, action) => {
  const parentIndex = state.data.findIndex( dataItem => dataItem.id.toString() === action.data[action.nested.parent].toString());
    if (parentIndex !== -1) {
      state.data[parentIndex][action.nested.key].push(action.data);
    } else {
      return state;
    }
  return {...state};
};

/**
 * deletes nested data in one reducer only one level of nested data supported
 * @param state
 * @param action
 * @returns {{}}
 */
export const deleteNested = (state, action) => {
  if (action.nested) {
    const parentIndex = state.data.findIndex( dataItem => dataItem.id.toString() === action.data[action.nested.parent].toString());
    if (parentIndex !== -1) {
      state.data[parentIndex][action.nested.key] = state.data[parentIndex][action.nested.key].filter( (item) => {
        return item.id.toString() !== action.data.id.toString();
      });
    }
    return {...state, deleted: true};
  }
};

/**
 * add all items from graphQl to redux reducer
 * @param state - the current state
 * @param action - the returned action
 * @returns {any}
 */
export const addFromGraphQl = (state, action: Action, type: string) => {
  Object.keys(action.data).forEach(key => {
    if (action.data[key].__typename === type) {
      const findItem = state.data.find( item => (item.id).toString() === (action.data[key].id).toString());
      if (!findItem) {
        state = {...state, data: [...state.data, action.data[key]]};
      }
    }
  });

  return state;
};

/**
 * it deletes one or more items from to the state if they exist in the state
 * @param state - the current state
 * @param action - the returned action
 * @returns {any}
 */
export const deleteMultiple = (state, action: Action, idProp: string) => {
  return {...state, data: state.data.filter (item => !action.data.find(element => element[idProp] === item[idProp])), deleted: true};
};

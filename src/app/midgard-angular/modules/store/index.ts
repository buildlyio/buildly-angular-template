import { redux } from 'midgard-core';

/**
 * exports redux-observable from midgard core
 */
export const reduxObservable = {
  ofType: redux.ofType,
  combineEpics: redux.combineEpics
}

export const reselect = {
  createSelector: redux.createSelector
}

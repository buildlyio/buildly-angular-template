import { redux } from 'midgard-core';

const getTopBarState = state => state.topBarReducer;

export const getTopBarOptions = redux.createSelector(
  getTopBarState,
  (topBarState) => {
    return topBarState.options;
  }
);

export const getTopBarSelectedOption = redux.createSelector(
  getTopBarState,
  (topBarState) => {
    return topBarState.selectedOption;
  }
);

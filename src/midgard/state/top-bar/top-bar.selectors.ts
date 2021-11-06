import { redux } from 'midgard-core';

const getTopBarState = (state: any) => state.topBarReducer;

export const getTopBarOptions = redux.createSelector(
  getTopBarState,
  (topBarState: any) => topBarState.options,
);

export const getTopBarSelectedOption = redux.createSelector(
  getTopBarState,
  (topBarState: any) => topBarState.selectedOption,
);

export const getTopBarSearchValue = redux.createSelector(
  getTopBarState,
  (topBarState: any) => topBarState.searchValue,
);

import { SET_TOPBAR_SEARCH_VALUE, SELECT_TOPBAR_OPTION, SET_TOPBAR_OPTIONS  } from './top-bar.actions';


const initialState = {
  options: [],
  selectedOption: null,
  searchValue: ''
};

export function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOPBAR_OPTIONS:
      return {...state, options: action.options, selectedOption: {index: 0, value: action.options ? action.options[0].value : '' }};
    case SELECT_TOPBAR_OPTION:
      return {...state, selectedOption: action.option};
    case SET_TOPBAR_SEARCH_VALUE:
      return {...state, searchValue: action.searchValue};
    default:
      return state;
  }
}

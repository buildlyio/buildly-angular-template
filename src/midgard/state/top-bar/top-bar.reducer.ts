import { SELECT_TOPBAR_OPTION, SET_TOPBAR_OPTIONS } from '@src/midgard/state/top-bar/top-bar.actions';


const initialState = {
  options: [],
  selectedOption: null
};

export function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOPBAR_OPTIONS:
      return {...state, options: action.options, selectedOption: {index: 0, value: action.options ? action.options[0].value : '' }};
    case SELECT_TOPBAR_OPTION:
      return {...state, selectedOption: action.option};
    default:
      return state;
  }
}

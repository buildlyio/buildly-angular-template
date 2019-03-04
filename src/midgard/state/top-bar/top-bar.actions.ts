export const SET_TOPBAR_OPTIONS = 'SET_TOPBAR_OPTIONS';
export const SELECT_TOPBAR_OPTION = 'SELECT_TOPBAR_OPTION';


export function setTopBarOptions(options) {
  return {
    type: SET_TOPBAR_OPTIONS,
    options
  };
}

export function selectTopBarOption(option) {
  return {
    type: SELECT_TOPBAR_OPTION,
    option
  };
}

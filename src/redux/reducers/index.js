import * as Actions from "../actions";

const defaultState = {
  user: null
}

const reducer = function (state = defaultState, action) {
  if (!action) return state
  switch (action.type) {
    case Actions.GET_FICHES:
      return {
        ...state,
        fiches: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

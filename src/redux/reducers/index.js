import * as Actions from "../actions";

const reducer = function (state = {}, action) {
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

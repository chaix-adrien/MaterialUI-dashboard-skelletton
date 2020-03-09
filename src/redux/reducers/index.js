import * as Actions from "../actions";
import axios from "axios.js"
const defaultState = {
  user: null
}

const reducer = function (state = defaultState, action) {
  if (!action) return state
  console.log("set state", action.type)
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case Actions.SET_TOKEN:
      axios.defaults.headers.common['Authorization'] = 'Token ' + action.payload;
      if (action.remember)
        localStorage.setItem('jwt_access_token', action.payload);
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
};

export default reducer;

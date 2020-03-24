import Actions from "../actions"
import axios from "axios.js"
const defaultState = {
  user: null,
}

const primaryKey = "uuid"

const reducer = function(state = defaultState, action) {
  const CRUDreducer = key => {
    switch (action.type) {
      case Actions["SET_" + key.toUpperCase() + "S"]:
        return {
          ...state,
          [key + "s"]: action.payload,
        }
      case Actions["SET_" + key.toUpperCase()]:
        return {
          ...state,
          [key]: action.payload,
        }
      case Actions["ADD_" + key.toUpperCase()]:
        return {
          ...state,
          [key + "s"]: (state[key + "s"] || []).concat([action.payload]),
        }
      case Actions["DELETE_" + key.toUpperCase()]:
        return {
          ...state,
          [key + "s"]: (state[key + "s"] || []).filter(c => c[primaryKey] !== action.payload),
        }
      default:
        return null
    }
  }
  if (!action) return state
  if (CRUDreducer("client")) return CRUDreducer("client")

  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case Actions.SET_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case Actions.SET_EDIT_USER:
      return {
        ...state,
        editUser: action.payload,
      }
    case Actions.SET_TOKEN:
      axios.defaults.headers.common["Authorization"] = "Token " + action.payload
      if (action.remember) localStorage.setItem("jwt_access_token", action.payload)
      return {
        ...state,
        token: action.payload,
      }

    default:
      return state
  }
}

export default reducer

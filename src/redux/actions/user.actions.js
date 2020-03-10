import axios from "axios.js";

export const SET_USER = "[USER APP] SET_USER";
export const SET_TOKEN = "[USER APP] SET_TOKEN";
export function login(email, password, remember = true) {
  const request = axios.post("/user/login", { email, password });
  return dispatch =>
    request
      .then(response => {
        dispatch({
          type: SET_TOKEN,
          payload: response.data.user.token,
          remember,
        })
        console.log("GET ME", axios.defaults.headers)
        return axios.get("/user/me").then(rep => {
          dispatch({
            type: SET_USER,
            payload: rep.data
          })
          return true
        })
      })
      .catch(e => console.log(e));
}


export function autoLogin() {
  if (localStorage.getItem('jwt_access_token')) {
    return dispatch => {
      const out = {
        wasLogged: false,
        logged: false
      }
      if (localStorage.getItem('jwt_access_token')) out.wasLogged = true
      dispatch({
        type: SET_TOKEN,
        payload: localStorage.getItem('jwt_access_token')
      })
      return axios.get("/user/me").then(rep => {
        if (rep.data) out.logged = true
        dispatch({
          type: SET_USER,
          payload: rep.data
        })
        return out
      })
    }
  }
  else
    return _ => Promise.resolve({ wasLogged: false, logged: false })
}

export function logout() {
  return dispatch => {
    dispatch({
      type: SET_TOKEN,
      payload: "",
      remember: true
    })
    dispatch({
      type: SET_USER,
      payload: null
    })
  }
}
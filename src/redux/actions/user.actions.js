import axios from "axios.js";

export const GET_FICHES = "[TEMPLATE APP] GET FICHES";
export function getFiches() {
  const request = axios.get("/fiches");
  return dispatch =>
    request
      .then(response => {
        return dispatch({
          type: GET_FICHES,
          payload: response.data
        });
      })
      .catch(e => console.log(e.response));
}

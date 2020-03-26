import axios from "axios.js"

function CRUDactions(key) {
  const keyUp = key.toUpperCase()
  const out = {}
  out["SET_" + keyUp + "S"] = `[${keyUp} APP] SET_${keyUp}S`
  out["SET_" + keyUp] = `[${keyUp} APP] SET_${keyUp}`
  out["ADD_" + keyUp] = `[${keyUp} APP] ADD_${keyUp}`
  out["DELETE_" + keyUp] = `[${keyUp} APP] DELETE_${keyUp}`

  //QUERY ALL
  out[`get${key}s`] = () => {
    const request = axios.get("/" + key)
    return dispatch =>
      request.then(response =>
        dispatch({
          type: out["SET_" + keyUp + "S"],
          payload: response.data.data,
        })
      )
  }

  //QUERY BY ID
  out[`get${key}`] = id => {
    if (id !== undefined) {
      const request = axios.get(`/${key}/${id}`)
      return dispatch =>
        request.then(response =>
          dispatch({
            type: out["SET_" + keyUp],
            payload: response.data,
          })
        )
    } else {
      return dispatch => {
        dispatch({
          type: out["SET_" + keyUp],
          payload: null,
        })
        return Promise.resolve()
      }
    }
  }

  //CREATE
  out[`create${key}`] = body => {
    const request = axios.post("/" + key, body)
    return dispatch =>
      request.then(response =>
        dispatch({
          type: out["ADD_" + keyUp],
          payload: response.data,
        })
      )
  }

  //EDIT
  out[`set${key}`] = (id, body) => {
    const request = axios.put(`/${key}/${id}`, body)
    return dispatch =>
      request.then(response =>
        dispatch({
          type: out["SET_" + keyUp],
          payload: response.data,
        })
      )
  }

  //DELETE
  out[`delete${key}`] = id => {
    const request = axios.delete(`/${key}/${id}`)
    return dispatch =>
      request.then(response =>
        dispatch({
          type: out["DELETE_" + keyUp],
          payload: id,
        })
      )
  }
  return out
}
const client = CRUDactions("Client")
const appartement = CRUDactions("Appartement")
const locataire = CRUDactions("Locataire")
export default { ...client, ...appartement, ...locataire }

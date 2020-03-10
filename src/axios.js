import axios from "axios";
import PubSub from 'pubsub-js'

console.log(process.env.NODE_ENV)
var axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://dev.atwio.eu:4700/api"
      : "https://vericlean.atwio.top/api"
})

axiosInstance.static = url =>
  url ? axiosInstance.defaults.baseURL + "/" + url : null;

axiosInstance.interceptors.response.use((rep) => rep, (error) => {
  console.log("INTERCEPT ERROR", error)
  if (error.response.status === 401 && window.location.pathname !== "/login") {
    window.location.pathname = "/login"
  }
  if (error.response.status === 403) {
    PubSub.notif({ txt: "Vous n'avez pas les droits suffisants pour effectuer cette action.", color: "danger" })

  }
  return error
})

export default axiosInstance;

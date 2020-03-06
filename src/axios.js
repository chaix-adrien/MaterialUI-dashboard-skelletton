import axios from "axios";

console.log(process.env.NODE_ENV)
var axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://dev.atwio.eu:4700/api"
      : "https://vericlean.atwio.top/api"
})

axiosInstance.static = url =>
  url ? axiosInstance.defaults.baseURL + "/" + url : null;
export default axiosInstance;

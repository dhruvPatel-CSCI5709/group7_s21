import axios from "axios";

axios.defaults.baseURL = "";
//   process.env.NODE_ENV === "production" ? `` : `//localhost:8080/api`;
axios.interceptors.request.use(
  function (config) {
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    return { ...config, headers };
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const Routes = {};

export default axios;

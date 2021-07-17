import axios from "axios";
import api from "./api/index";

axios.defaults.baseURL = "https://csci-5709-group7.herokuapp.com/api";
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

export const Routes = {
  api,
};

export default axios;

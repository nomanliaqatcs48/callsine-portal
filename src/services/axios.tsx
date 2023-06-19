import axios from "axios";
import config from "../config";
import { devLog, devLogError } from "../helpers/logs";

axios.defaults.baseURL = config.service.BASE_URL; //BASE URL
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(
  (config: any) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    /*devLog(() => {
      console.log("test res", res);
    });*/
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    /*devLog(() => {
      console.log("test err", err);
      console.log("test originalConfig", originalConfig);
    });*/

    if (
      !originalConfig.url.includes("/login") &&
      !originalConfig.url.includes("/refresh") &&
      !originalConfig.url.includes("/token") &&
      !originalConfig._retry &&
      err.response
    ) {
      // Access Token was expired
      if (err.response.status === 401) {
        originalConfig._retry = true;

        try {
          const rs: any = await axios.post("/token/refresh/", {
            refresh: localStorage.getItem("refresh"),
          });
          localStorage.setItem("token", rs.data.access);
          originalConfig.headers["Authorization"] = `Bearer ${rs.data.access}`;
          return axios(originalConfig);
        } catch (_error: any) {
          devLogError(_error.toJSON());
          Object.keys(localStorage).forEach(function (key) {
            localStorage.removeItem(key);
          });
          window.location.href = "/login";
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

const http = {
  request: axios,
  create: axios.create,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default http;

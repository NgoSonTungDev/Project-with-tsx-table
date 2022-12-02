import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use(
  function (config) {
    const newConfig = {
      ...config,
      token: 123,
    };
    return newConfig;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.errors);
  }
);

import axios from "axios";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "DELETE, POST, GET";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";
axios.defaults.baseURL = "http://localhost:3000/api/v1";

axios.interceptors.request.use(
  config => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
    }
    return config;
  }, (error) => Promise.reject(error)
);

export default axios;

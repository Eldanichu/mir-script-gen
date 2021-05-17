import Vue from '../main'
import axios from 'axios';
import routers from "../router";
import store from "../store";

const URL = ''

let http = axios.create({
  baseURL: URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    "Access-Control-Allow-Origin": "*"
  },
});


http.interceptors.request.use(
  config => {
    config.baseURL = URL;
    config.withCredentials = false;
    let token = localStorage.getItem('_t') ? localStorage.getItem('_t') : null;
    if (token) {
      config.headers = {
        'Authorization': token,
        'Content-Type': config.headers ? config.headers['Content-Type'] : 'application/json;charset=utf-8',
      };
    }
    return config
  },
  error => {
    if (axios.isCancel(error)) {
      console.debug(error)
    }
    return Promise.reject(error)
  }
);

http.interceptors.response.use(
  response => {
    if (response.code === 401 || response.data.code === 401) {
      localStorage.removeItem('_t')
      routers.replace('/login')
    }
    return response
  },
  error => {
    let { message } = error;
    if (message === "Network Error") {
      message = "网络连接错误";
    }
    else if (message.includes("timeout")) {
      message = "请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    Vue.$message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

const CancelToken = axios.CancelToken;
function apiAxios(method, url, params, name, headers) {
  let base = {
    method: method,
    headers: headers,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    cancelToken: new CancelToken(function executor(c) {
      //这个executor 函数接受一个cancel function作为参数
      store.dispatch('pushRequest', {name: name, scr: c});
    })
  };
  return http(headers ? Object.assign(base, {headers: headers}) : base)
}

export default {
  get: async function (url, params, name) {
    return apiAxios('GET', url, params, name)
  },
  post: async function (url, params, name, headers) {
    return apiAxios('POST', url, params, name, headers)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  },
  file_post: function (url, params, name) {
    return apiAxios('POST', url, params, name, {
      'Content-Type': 'multipart/form-data',
      "Access-Control-Allow-Origin": "*"
    })
  },
  axios: http
}


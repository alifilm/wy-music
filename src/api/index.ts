import axios from 'axios';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let data = response.data;
    return data;
  }
)

export {
  service
};


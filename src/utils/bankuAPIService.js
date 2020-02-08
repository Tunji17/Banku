import axios from 'axios';
import Cookie from 'js-cookie';


export const API_URL = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
  const token = Cookie.get('bankuToken');
  if (token) {
  // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token;
  }
  return config;
});

const BANKU_SERVICE = {
  get(endpoint) {
    return instance.get(endpoint);
  },

  post(endpoint, data) {
    return instance.post(endpoint, data);
  },

  patch(endpoint, data) {
    return instance.patch(endpoint, data);
  },
  put(endpoint, data) {
    return instance.put(endpoint, data);
  },

  delete(endpoint) {
    return instance.delete(endpoint);
  },
};

export default BANKU_SERVICE;

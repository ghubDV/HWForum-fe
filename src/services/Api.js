import axios from 'axios';
import store from '../stores';

const instance = axios.create({
  baseURL: 'http://192.168.0.220:4000/'
})

const requireLoader = [
  'register', 
  'login', 
  'logout', 
  'sendCode',
  'createProfile',
  'createThread',
  'updateProfile',
  'getThreadsTopic',
];

instance.interceptors.request.use(function (config) {
  if(requireLoader.includes(config.url.split('?')[0])) {
    store.dispatch('common/startLoading');
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if(requireLoader.includes(response.config.url.split('?')[0])) {
    store.dispatch('common/finishLoading')
  }
  return response;
}, function (error) {
  if(error.response.status === 401 && error.config) {
    store.dispatch('auth/logout');
  }
  if(error.response.status === 403 && error.config) {
    store.dispatch('auth/logout', {
      redirect: true
    });
  }
  if(requireLoader.includes(error.response.config.url.split('?')[0])) {
    store.dispatch('common/finishLoading')
  }
  return Promise.reject(error);
});

export default () => {
  return instance
}
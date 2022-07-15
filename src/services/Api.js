import axios from 'axios';
import store from '../stores';

const instance = axios.create({
  baseURL: 'http://localhost:4000/'
})

const requireLoader = ['register', 'login'];

instance.interceptors.request.use(function (config) {
  if(requireLoader.includes(config.url)) {
    store.dispatch('main/startLoading');
  }
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if(requireLoader.includes(response.config.url)) {
    store.dispatch('main/finishLoading')
  }
  return response;
}, function (error) {
  if(requireLoader.includes(error.response.config.url)) {
    store.dispatch('main/finishLoading')
  }
  return Promise.reject(error);
});

export default () => {
  return instance
}
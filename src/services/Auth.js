import Api from './Api';

export default {
  authorize() {
    return Api().get('checkAuthorization', { withCredentials: true });
  },

  login(credentials) {
    return Api().post('login', credentials, { withCredentials: true })
  },

  register (credentials) {
    return Api().post('register', credentials)
  }
}
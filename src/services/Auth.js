import Api from './Api';

export default {
  activate (credentials) {
    return Api().patch('activateAccount', credentials);
  },

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
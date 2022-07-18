import Api from './Api';

export default {
  activate (credentials) {
    return Api().patch('activateAccount', credentials);
  },

  authorize () {
    return Api().get('checkAuthenthication', { withCredentials: true });
  },

  login (credentials) {
    return Api().post('login', credentials, { withCredentials: true });
  },

  logout () {
    return Api().delete('logout', { withCredentials: true });
  },

  register (credentials) {
    return Api().post('register', credentials);
  },

  sendActivationCode (credentials) {
    return Api().post('/sendActivationCode', credentials);
  }
}
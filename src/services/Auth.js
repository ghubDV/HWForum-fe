import Api from './Api';

export default {
  activate (credentials) {
    return Api().patch('activateAccount', credentials);
  },

  authorize () {
    return Api().get('checkAuthenthication', { withCredentials: true });
  },

  checkReset (credentials) {
    return Api().post('checkReset', credentials);
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

  reset (credentials) {
    return Api().patch('resetPassword', credentials);
  },

  sendCode (credentials) {
    return Api().post('sendCode', credentials);
  }
}
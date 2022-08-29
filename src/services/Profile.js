import Api from './Api';

export default {
  createProfile(credentials) {
    return Api().post('createProfile', credentials, { withCredentials: true });
  },

  getProfile(username) {
    return Api().get(`getProfile?username=${username}`);
  },

  updateProfile(credentials) {
    return Api().patch('updateProfile', credentials , { withCredentials: true })
  }
}
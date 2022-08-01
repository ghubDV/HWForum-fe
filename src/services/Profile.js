import Api from './Api';

export default {
  createProfile(credentials) {
    return Api().post('createProfile', credentials, { withCredentials: true });
  }
}
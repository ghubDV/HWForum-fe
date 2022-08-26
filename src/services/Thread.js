import Api from './Api';

export default {
  createThread(credentials) {
    return Api().post('createThread', credentials, { withCredentials: true });
  },
}
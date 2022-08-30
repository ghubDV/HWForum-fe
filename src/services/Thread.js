import Api from './Api';

export default {
  createThread(credentials) {
    return Api().post('createThread', credentials, { withCredentials: true });
  },

  getThreadById(threadID) {
    return Api().get(`getThreadById?threadID=${threadID}`);
  },

  updatePost(credentials) {
    return Api().patch('updatePost', credentials, { withCredentials: true });
  }
}
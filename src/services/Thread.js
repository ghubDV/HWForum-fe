import Api from './Api';

export default {
  createComment(credentials) {
    return Api().post('createComment', credentials, { withCredentials: true });
  },

  createThread(credentials) {
    return Api().post('createThread', credentials, { withCredentials: true });
  },

  getThreadAndComments(threadID) {
    return Api().get(`getThreadAndComments?threadID=${threadID}`);
  },

  updatePost(credentials) {
    return Api().patch('updatePost', credentials, { withCredentials: true });
  }
}
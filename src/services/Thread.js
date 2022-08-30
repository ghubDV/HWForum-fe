import Api from './Api';

export default {
  createComment(credentials) {
    return Api().post('createComment', credentials, { withCredentials: true });
  },

  createThread(credentials) {
    return Api().post('createThread', credentials, { withCredentials: true });
  },

  getThreadById(threadID) {
    return Api().get(`getThreadOrCommentsByThread?threadID=${threadID}&isThread=true`);
  },

  getCommentsInThread(threadID) {
    return Api().get(`getThreadOrCommentsByThread?threadID=${threadID}`);
  },

  updatePost(credentials) {
    return Api().patch('updatePost', credentials, { withCredentials: true });
  }
}
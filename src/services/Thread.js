import Api from './Api';

export default {
  createComment(credentials) {
    return Api().post('createComment', credentials, { withCredentials: true });
  },

  createThread(credentials) {
    return Api().post('createThread', credentials, { withCredentials: true });
  },

  deletePost({ id, threadID }) {
      return Api().post('deletePost', { id, threadID }, { withCredentials: true });
  },

  updatePost(credentials) {
    return Api().patch('updatePost', credentials, { withCredentials: true });
  },

  getThreadAndComments({ threadID, pageSize, page }) {
    return Api().post('getThreadAndComments', { threadID, pageSize, page });
  },

}
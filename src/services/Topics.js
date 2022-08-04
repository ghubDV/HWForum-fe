import Api from './Api';

export default {
  getCategories() {
    return Api().get('getCategories');
  },

  getTopics(category) {
    return Api().get(`getTopics?category=${category}`);
  },

  getTopicsCategories() {
    return Api().get('getTopicsCategories');
  }
}
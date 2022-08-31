
const HOME = {
  path: '/',
  name: 'Home',
  component: 'Home'
};

const REGISTER = {
  path: '/register',
  name: 'Register',
  component: 'Auth',
  noAuth: true
};

const LOGIN = {
  path: '/login',
  name: 'Login',
  component: 'Auth',
  noAuth: true
};

const ACTIVATE = {
  path: '/activate',
  name: 'Activate',
  component: 'Auth'
};

const RESET = {
  path: '/reset',
  name: 'Reset',
  component: 'Auth'
};

const PROFILE = {
  path: '/profile',
  name: 'Profile',
  component: 'Profile',
  auth: true
}

const THREAD_LIST = {
  path: '/topic/:name?:id(\\d+)/',
  name: 'ThreadList',
  component: 'ThreadList'
}

const CREATE_THREAD = {
  path: '/topic/:name?:id(\\d+)?/create-thread',
  name: 'CreateThread',
  component: 'CreateThread',
  auth: true
}

const THREAD_DETAILS = {
  path: '/thread/:name?.:id(\\d+)',
  name: 'ThreadDetails',
  component: 'ThreadDetails'
}

export {
  HOME,
  REGISTER,
  LOGIN,
  ACTIVATE,
  RESET,
  PROFILE,
  THREAD_LIST,
  CREATE_THREAD,
  THREAD_DETAILS
}
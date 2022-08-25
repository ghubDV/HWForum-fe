
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
  path: '/topic/:name?:id(\\d+)',
  name: 'ThreadList',
  component: 'ThreadList'
}

const CREATE_THREAD = {
  path: '/thread/create',
  name: 'CreateThread',
  component: 'CreateThread',
  auth: true
}

export {
  HOME,
  REGISTER,
  LOGIN,
  ACTIVATE,
  RESET,
  PROFILE,
  THREAD_LIST,
  CREATE_THREAD
}
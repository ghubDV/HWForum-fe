
const HOME = {
  path: '/',
  name: 'Home',
  component: 'Home'
};

const REGISTER = {
  path: '/register',
  name: 'Register',
  component: 'Auth'
};

const LOGIN = {
  path: '/login',
  name: 'Login',
  component: 'Auth'
};

const ACTIVATE = {
  path: '/activate',
  name: 'Activate',
  component: 'Auth'
};

const PROTECTED = {
  path: '/protected',
  name: 'Protected',
  component: 'Protected',
  protected: true
};

export {
  HOME,
  REGISTER,
  LOGIN,
  ACTIVATE,
  PROTECTED,
}
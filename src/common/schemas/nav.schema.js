export default isLoggedIn => {
  return isLoggedIn 
  ? 
  [
    {
      text: 'Profile',
      redirect: '/profile',
      icon: 'settings'
    },
    {
      text: 'Logout',
      action: 'logout',
      icon: 'logout'
    }
  ] 
  :
  [
    {
      text: 'Login',
      redirect: '/login'
    },
    {
      text: 'Register',
      redirect: '/register'
    },
  ]
};
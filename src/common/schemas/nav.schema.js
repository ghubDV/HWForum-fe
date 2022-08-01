export default isLoggedIn => {
  return isLoggedIn 
  ? 
  [
    {
      text: 'Logout',
      action: 'logout',
    },
    {
      text: 'Home',
      redirect: '/'
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
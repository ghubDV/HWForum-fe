const register = {
  title: "Create an account",
  submit: "Register",
  inputs: [
    {
      type: "text",
      name: "username",
      placeholder: "username",
    },
    {
      type: "email",
      name: "email",
      placeholder: "email",
    },
    {
      type: "password",
      name: "password",
      placeholder: "password",
    },
    {
      type: "password",
      name: "confirm_password",
      placeholder: "confirm password",
    }
  ],
  additional: [  
    {
      text: 'Already have an account? Log in!',
      redirect: '/login'
    },
  ]
}

const login = {
  title: "Log into your account",
  submit: "Login",
  inputs: [
    {
      type: "text",
      name: "username",
      placeholder: "username",
    },
    {
      type: "password",
      name: "password",
      placeholder: "password",
    },
  ],
  additional: [  
    {
      text: 'Create an account!',
      redirect: '/register'
    }
  ]
}

const activate = {
  title: "Activate your account",
  submit: "Activate",
  inputs: [
    {
      type: "text",
      name: "code",
      placeholder: "activation code",
      value: true
    },
  ]
}

export {
  register,
  login,
  activate
}
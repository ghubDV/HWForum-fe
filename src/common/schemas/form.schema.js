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
      text: 'Forgot your password?',
      redirect: '/reset'
    },
    {
      text: 'Create an account!',
      redirect: '/register'
    },
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

const reset = {
  send: {
    title: "Get your reset password code",
    submit: "Get Code",
    inputs: [
      {
        type: "hidden",
        name: "type",
        value: "reset"
      },
      {
        type: "email",
        name: "email",
        placeholder: "email"
      },
    ],
    action: 'sendCode'
  },

  code: {
    title: "Enter the reset password code",
    submit: "Go",
    inputs: [
      {
        type: "text",
        name: "code",
        placeholder: "reset code",
        value: true
      },
    ],
    action: 'checkReset'
  },

  change: {
    title: "Reset your password",
    submit: "Reset",
    inputs: [
      {
        type: "password",
        name: "password",
        placeholder: "password"
      },
      {
        type: "password",
        name: "confirm_password",
        placeholder: "confirm password"
      },
    ]
  }
}

export {
  register,
  reset,
  login,
  activate
}
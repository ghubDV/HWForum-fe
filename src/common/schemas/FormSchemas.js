const register = {
  title: "Create an account",
  submit: "register",
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
      placeholder: "confirm_password",
    }
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
  ]
}

export {
  register,
  login
}
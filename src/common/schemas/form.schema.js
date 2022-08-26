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
    additional: [
      {
        text: 'Enter a reset code!',
        redirect: '/reset?code='
      }
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

const profile = {
  title: "Your profile details",
  submit: {
    create: {
      name: "create profile",
      action: "createProfile"
    },
    update: {
      name: "update profile",
      action: "updateProfile",
    }
  },
  inputs: [
    {
      type: "text",
      name: "profileName",
      placeholder: "profile name",
      required: true
    },
    {
      type: "text",
      name: "firstName",
      placeholder: "first name",
    },
    {
      type: "text",
      name: "lastName",
      placeholder: "last name",
    },
    {
      type: "checkbox",
      name: "isPublic",
      label: "Make my profile public",
      extraClass: " input--checkbox"
    }
  ]
}

const createThread = {
  title: "Create a new thread",
  submit: "Create",
  inputs: [
    {
      type: "text",
      name: "name",
      placeholder: "Thread title",
      required: true
    },
  ],
  selects: [
    {
      grouped: true,
      subGroup: "topics",
      name: "topic"
    }
  ]
}

export {
  register,
  reset,
  login,
  activate,
  profile,
  createThread
}
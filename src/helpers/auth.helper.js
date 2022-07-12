import Auth from '@/services/Auth';

const authenthicate = async (authType, user) => {
  let validation = {
    messages: [],
    type: ''
  }

  try {
    const response = await Auth[authType](user);
    validation.messages.push(response.data.message);
    validation.type = 'success';
  } catch (error) {
    validation.messages.push(`${error.response.statusText}: ${error.response.data.message}`);
    validation.type = 'error';
  }

  return validation;
}

export {
  authenthicate
}
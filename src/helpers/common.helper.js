const getFormData = (form, result = {}) => {
  const formData = new FormData(form);
  for (const [inputName, value] of formData) {
    result[inputName] = value;
  }

  return result;
}

const formatResponse = (res) => {
  if(res.status !== 200) {
    return {
      messages: [res.response.data.message],
      type: 'error'
    };
  }

  return {
    messages: [res.data.message],
    type: 'success'
  };
}

export {
  getFormData,
  formatResponse
}
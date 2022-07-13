const getFormData = (form, result = {}) => {
  const formData = new FormData(form);
  for (const [inputName, value] of formData) {
    result[inputName] = value;
  }

  return result;
}

export {
  getFormData
}
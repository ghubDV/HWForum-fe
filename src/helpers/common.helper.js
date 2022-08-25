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
      messages: res.response.data.map( err => err.message ),
      type: 'error'
    };
  }

  return {
    messages: [res.data.message],
    type: 'success'
  };
}

const getAvatarColor = () => {
  let color = "#";
    
  for(let i = 0; i<6; i++) {
    let random;
    if(i%2 === 0) {
      random = Math.floor(Math.random()*8);
    } else {
      random = Math.floor(Math.random()*16);
    }
     color += random.toString(16);
  }
  
  return color;
}

const timeElapsed = (time) => {
  const moment = require('moment');
  return moment(new Date(time)).fromNow();
}

export {
  getFormData,
  formatResponse,
  getAvatarColor,
  timeElapsed
}
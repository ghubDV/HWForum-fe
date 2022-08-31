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
  const targetDate = moment(new Date(time));
  const daysFromTarget = moment(new Date()).diff(targetDate, 'days');

  if(daysFromTarget > 0) {
    return targetDate.format('MMM Do, H:mm A')
  }

  return moment(new Date(time)).fromNow();
}

const getTextEditorContent = (editor) => {
  return {
    text: editor.getText(),
    html: editor.getHTML()
  };
}

const createFriendlyURL = (base, toReplace, identifier) => {
  return base + 
         toReplace
         .toLowerCase()
         .trim()

         //replace any characters that are different from letters, numbers with hyphens
         .replace(/[^a-z|0-9|-]+/g, '-')

         //trim redundant hyphens from url
         .replace(/^[-]*|[-]*$/gi, '') 
         + '.' + identifier;
}

export {
  getFormData,
  formatResponse,
  getAvatarColor,
  timeElapsed,
  getTextEditorContent,
  createFriendlyURL
}
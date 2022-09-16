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
  const targetDate = new Date(time);
  const now = new Date();

  const milliseconds = now.getTime() - targetDate.getTime();
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 24) {
    const [, month, dayNum, , clock] = targetDate.toString().split(' ');
    const [ hour ] = clock.split(':');
    const suffixedDay = createNumberSuffix(parseInt(dayNum));

    return `${month} ${suffixedDay}, ${clock.slice(0, -3)} ${parseInt(hour) >= 12 ? 'PM' : 'AM'}`;
  } else {
    if(minutes === 0 && hours === 0) {
      return 'a few seconds ago';
    }

    if(minutes > 0 && hours === 0) {
      return `${minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`}`;
    }

    if(hours > 0) {
      return `${hours === 1 ? 'an hour ago' : `${hours} hours ago`}`;
    }
  }
}

const createNumberSuffix = (number) => {
  const lastDigit = number % 10;
  let suffixedNumber = number.toString();
  if(number % 100 >= 10 && number % 100 <= 13) {
    suffixedNumber += 'th';
  } else {
    switch (lastDigit) {
      case 1:
        suffixedNumber += 'st';
        break;
      case 2:
        suffixedNumber += 'nd';
        break;
      case 3:
        suffixedNumber += 'rd';
        break;
      default: 
        suffixedNumber += 'th';
        break;
    }
  }

  return suffixedNumber;
}

const getTextEditorContent = (editor) => {
  return {
    text: editor.getText(),
    html: editor.getHTML().replaceAll(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/g, '<p><br></p>')
  };
}

const createFriendlyURL = (base, toReplace, identifier, query = '') => {
  return base + 
         toReplace
         .toLowerCase()
         .trim()

         //replace any characters that are different from letters, numbers with hyphens
         .replace(/[^a-z|0-9]+/g, '-')

         //trim redundant hyphens from url
         .replace(/^[-]*|[-]*$/gi, '') 
         + '.' + identifier + query;
}

const setCurrentPage = (queryPage, pageCount) => {
  const parsedQueryPage = parseInt(queryPage);
  return parsedQueryPage && parsedQueryPage <= pageCount  ?  parsedQueryPage : 1;
}

export {
  getFormData,
  formatResponse,
  getAvatarColor,
  timeElapsed,
  getTextEditorContent,
  createFriendlyURL,
  setCurrentPage
}
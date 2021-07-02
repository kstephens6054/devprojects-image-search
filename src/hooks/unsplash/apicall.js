import axios from 'axios';

const getData = async (url, options = {}) => {
  try {
    const response = await axios.get(url, options);
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    if (error.response) {
      return {
        data: null,
        error: error.response.statusText
      };
    }

    console.log(error);

    if (error.request) {
      return {
        data: null,
        error: 'Bad request'
      };
    }
  }

  return {
    data: null,
    error: 'Internal error'
  };
};

export default getData;

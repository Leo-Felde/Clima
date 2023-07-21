import axios from 'axios';

const createAPI = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

export default createAPI;
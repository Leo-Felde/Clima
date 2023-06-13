
import axios from 'axios';

const baseURL = 'https://api.open-meteo.com/v1/gfs';

const api = axios.create({
  baseURL,
});

const getForecast = async (options) => {
  try {
    const response = await api.get('', { params: options });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export default getForecast;
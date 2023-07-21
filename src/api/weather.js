
import createAPI from './index';

const baseURL = 'https://api.open-meteo.com/v1/gfs';

const api = createAPI(baseURL)

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
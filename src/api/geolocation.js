
import createAPI from './index';

const baseURL = 'https://geocoding-api.open-meteo.com/v1/search';

const api = createAPI(baseURL)

const getCity = async (options) => {
  try {
    const response = await api.get('', { params: options });
    return response.data;
  } catch (error) {
    console.error('Error fetching city:', error);
    throw error;
  }
};

export default getCity;

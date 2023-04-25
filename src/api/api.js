
const API_DEV = 'http://localhost:3000/api';
const API_PRODUCT = '';
const baseURL = process.env.NODE_ENV === 'development' ? API_DEV : API_PRODUCT;

const api = {
  baseURL,
}

export default api;


const { REACT_APP_SERVER } = process.env;

const API_DEV = `${REACT_APP_SERVER}/api`;
const API_PRODUCT = '';
const baseURL = process.env.NODE_ENV === 'development' ? API_DEV : API_PRODUCT;

const api = {
  baseURL,
}

export default api;

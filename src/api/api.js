

const { REACT_APP_SERVER } = process.env;

// const API_DEV = `${REACT_APP_SERVER}/api`;
// const API_PRODUCT = `${REACT_APP_SERVER}/api`;
const baseURL = `${REACT_APP_SERVER}/api`; //process.env.NODE_ENV === 'development' ? API_DEV : API_PRODUCT;
console.log('baseURL??', baseURL)
console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const api = {
  baseURL,
}

export default api;

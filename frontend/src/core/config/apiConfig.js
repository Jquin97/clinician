import axios from 'axios';

let API_BASE_URL = 'http://localhost:5000';
if (process.env.REACT_APP_ENV === 'development') {
  API_BASE_URL = process.env.REACT_APP_DEV_API_BASE_URL;
} else if (process.env.REACT_APP_ENV === 'production') {
  API_BASE_URL = process.env.REACT_APP_API_URL;
} else if (process.env.REACT_APP_ENV === 'staging') {
  API_BASE_URL = process.env.REACT_APP_API_URL;
}
export const base = `${API_BASE_URL}/api/${process.env.REACT_APP_API_VERSION}`;
const API_URLS = {
  LOGIN: base + '/auth',
  FORGOT_PASSWORD: base + '/auth/forgotPassword',
  RESET_PASSWORD: base + '/auth/resetPassword',
  VERIFY_TOKEN: base + '/auth/verifyToken',
  SCAN_RESULT: base + '/scans',
};

const apiClient = axios.create({
  baseURL: base,
});

const protectedapiClient = axios.create({
  baseURL: base,
  headers: {
    Authorization: JSON.parse(localStorage.getItem('userData'))?.token,
  },
});

export { apiClient, protectedapiClient };
export default API_URLS;

import axios from 'axios';
import API_URLS from '../config/apiConfig';

export const login = async (data) => {
  return await axios.post(`${API_URLS.LOGIN}`, { data });
};
export const forgotPassword = async (data) => {
  return await axios.put(`${API_URLS.FORGOT_PASSWORD}`, { data });
};
export const resetPassword = async (data, token) => {
  return await axios.put(
    `${API_URLS.RESET_PASSWORD}`,
    { data },
    {
      headers: { Authorization: `${token}` },
    }
  );
};
export const verifyToken = async (token) => {
  return await axios.get(`${API_URLS.VERIFY_TOKEN}`, {
    headers: { Authorization: `${token}` },
  });
};

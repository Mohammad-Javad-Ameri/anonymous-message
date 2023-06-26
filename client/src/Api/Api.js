import axios from "axios";

const BACKEND_URL = "http://62.106.95.121:5002";

export const login = (Email, Password) => {
  return axios.post(`${BACKEND_URL}/api/Account/login`, {
    Email,
    Password,
  });
};

export const signup = (
  Email,
  FristName,
  LastName,
  Password,
  ConfirmPassword
) => {
  return axios.post(`${BACKEND_URL}/api/Account/register`, {
    Email,
    FristName,
    LastName,
    Password,
    ConfirmPassword,
  });
};

export const refreshToken = (refreshToken) => {
  return axios.post(`${BACKEND_URL}/api/Account/RefreshToken`, {
    refreshToken,
  });
};

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/constants';
import { getCookie } from '@/utils/cookie';
import authAxiosInstance from './authAxiosInstance';
import authApi from './authApi';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//axiosInterceptor
const onRequest = (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie({ name: 'accessToken' });
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onFulfilled = (res: AxiosResponse) => {
  const { method, url } = res.config;
  const { status, statusText } = res;
  return res;
};

const onRejected = async (error: AxiosError | Error) => {
  const refreshToken = getCookie({ name: 'refreshToken' });
  if (axios.isAxiosError(error) && error.config) {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const { method, url } = error.config;

    if (error.response) {
      const { status } = error.response;
      if (status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await authApi.postToken({ refreshToken });
          const newAccessToken = response.data.accessToken;

          if (!!document) {
            document.cookie = `accessToken=${newAccessToken}; path=/`;
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return authAxiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
  } else {
    console.log(`error: ${error.message}`);
  }

  return Promise.reject(error);
};

export default axiosInstance;

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

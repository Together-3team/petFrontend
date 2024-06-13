import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookie';
import axiosInstance from './axiosInstance';
import refreshToken from './refreshToken';

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  console.log(`${method} - ${url}`);
  console.log('config', config);

  const accessToken = getCookie({ name: 'token' }) ?? '토큰을 찾을 수 없습니다.';
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const onFulfilled = (res: AxiosResponse) => {
  const { method, url } = res.config;
  const { status, statusText } = res;

  if (status === 200) {
    console.log(`${method} - ${url} success: ${statusText}`);
  } else {
    console.log(`${method} - ${url} server error: ${statusText}`);
  }
  return res;
};

const onRejected = async (error: AxiosError | Error) => {
  if (axios.isAxiosError(error) && error.config) {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const { method, url } = error.config;

    if (error.response) {
      const { status } = error.response;
      console.log(`${method} - ${url} error : ${status}`);
      if (status === 500 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
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

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

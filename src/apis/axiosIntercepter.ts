import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie } from '@/utils/cookie';
import axiosInstance from './axiosInstance';

const onRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  console.log(`${method} - ${url}`);
  console.log('config', config);

  const token = getCookie({ name: 'token' }) ?? '토큰을 찾을 수 없습니다.';
  config.headers.Authorization = `Bearer ${token}`;
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

const onRejected = (error: AxiosError | Error) => {
  if (axios.isAxiosError(error) && error.config) {
    const { method, url } = error.config;

    if (error.response) {
      const { status } = error.response;
      console.log(`${method} - ${url} error : ${status}`);
    }
  } else {
    console.log(`error: ${error.message}`);
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(onFulfilled, onRejected);

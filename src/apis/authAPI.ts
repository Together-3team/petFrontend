import { getCookie } from 'cookies-next';
import axiosInstance from './axiosInstance';

//인증 관련 API 요청

const token = getCookie('token');

const authAPI = {
  getGoggleAuth: () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`/auth/goggle`, { headers });
  },
  getKakaoAuth: () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return axiosInstance.get(`/auth/kakao`, { headers });
  },
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post(`/register`, body);
  },
  postToken: <T>(body: T) => {
    return axiosInstance.post(`/auth/refresh`, body);
  },
};

export default authAPI;

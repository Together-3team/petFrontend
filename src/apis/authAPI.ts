import axiosInstance from './axiosInstance';
import { API_BASE_URL } from '@/constants';

//인증 관련 API 요청

export interface GoogleAuthResponse {
  registered: boolean;
  profileToken: string;
  accessToken?: string;
}

export interface KakaoAuthResponse {
  registered: boolean;
  profileToken: string;
  accessToken?: string;
}

const authAPI = {
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post(`/auth/register`, body);
  },

  postToken: <T>(body: T) => {
    return axiosInstance.post(`/auth/refresh`, body);
  },
};

export default authAPI;

import { useRouter } from 'next/router';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from './axiosInstance';

//인증 관련 API 요청

const authAPI = {
  getGoogleAuth: () => {
    return axiosInstance.get(`/auth/google`).then(response => {
      const router = useRouter();
      if (response.data.registered === true) {
        const { accessToken } = response.data;
        saveTokenToCookie(accessToken);
        router.push('/onboarding');
      } else {
        router.push('/signup');
      }
    });
  },
  getKakaoAuth: () => {
    return axiosInstance.get(`/auth/kakao`).then(response => response.data);
  },
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post(`/register`, body);
  },
  postToken: <T>(body: T) => {
    return axiosInstance.post(`/auth/refresh`, body);
  },
};

export default authAPI;

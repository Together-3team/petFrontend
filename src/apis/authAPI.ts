import { useRouter } from 'next/router';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from './axiosInstance';

//인증 관련 API 요청

export async function GetGoogleAuth() {
  const router = useRouter();
  try {
    const response = await axiosInstance.get(`/auth/google`);
    if (response.data.registered === true) {
      const { accessToken } = response.data;
      saveTokenToCookie(accessToken);
      router.push('/onboarding');
    } else {
      router.push('/signup');
    }
  } catch (error) {
    console.log('토큰을 확인할 수 없습니다.', error);
  }
}

export async function GetKakaoAuth() {
  const router = useRouter();
  try {
    const response = await axiosInstance.get(`/auth/kakao`);
    if (response.data.registered === true) {
      const { accessToken } = response.data;
      saveTokenToCookie(accessToken);
      router.push('/onboarding');
    } else {
      router.push('/signup');
    }
  } catch (error) {
    console.log('토큰을 확인할 수 없습니다.', error);
  }
}

const authAPI = {
  postRegisterData: <T>(body: T) => {
    return axiosInstance.post(`/signup`, body);
  },

  postToken: <T>(body: T) => {
    return axiosInstance.post(`/auth/refresh`, body);
  },
};

export default authAPI;

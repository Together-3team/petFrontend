import { useRouter } from 'next/router';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from './axiosInstance';
import { API_BASE_URL } from '@/constants';

//인증 관련 API 요청

export interface GoogleAuthResponse {
  registered: boolean;
  profileToken: string;
  accessToken?: string;
}

export async function GetGoogleAuth(): Promise<GoogleAuthResponse> {
  const response = await axiosInstance.get(`/auth/google`);
  return response.data;
  // const router = useRouter();
  // try {
  //   const response = await axiosInstance.get(`/auth/google`);
  //   console.log(response.data);
  //   if (response.data.registered === true) {
  //     const { accessToken } = response.data;
  //     saveTokenToCookie(accessToken);
  //     router.push('/onboarding');
  //   } else {
  //     router.push(API_BASE_URL + '/signup');
  //   }
  // } catch (error) {
  //   console.log('토큰을 확인할 수 없습니다.', error);
  // }
}

export async function GetKakaoAuth() {
  try {
    const router = useRouter();
    const response = await axiosInstance.get(`/auth/kakao`);
    if (response.data.registered === true) {
      const { accessToken } = response.data;
      saveTokenToCookie(accessToken);
      router.push('/onboarding');
    } else {
      router.push(API_BASE_URL + '/signup');
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

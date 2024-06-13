import axiosInstance from './axiosInstance';
import { getCookie, setCookie } from '@/utils/cookie';

export default async function refreshToken() {
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      token: getCookie({ name: 'refreshToken' }),
    });
    const { accessToken } = response.data;
    setCookie({ name: 'token', value: accessToken });
    return accessToken;
  } catch (error) {
    console.error('토큰 갱신 실패: ', error);
    window.location.href = '/my';
  }
}

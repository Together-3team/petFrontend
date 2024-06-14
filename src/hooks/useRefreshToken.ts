import { useCookies } from 'react-cookie';
import axiosInstance from '../apis/axiosInstance';
import { useCallback } from 'react';

export default function useRefreshToken() {
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh', { refreshToken: cookies.refreshToken });
      const { refreshToken } = response.data;
      setCookie('refreshToken', refreshToken);
      return refreshToken;
    } catch (error) {
      console.error('토큰 갱신 실패: ', error);
      window.location.href = '/my';
    }
  }, [cookies.refreshToken, setCookie]);

  return refreshToken;
}

// try {
//   const response = await axiosInstance.post('/auth/refresh', {
//     token: getCookie({ name: 'refreshToken' }),
//   });
//   const { accessToken } = response.data;
//   setCookie({ name: 'token', value: accessToken });
//   return accessToken;
// }

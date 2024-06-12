import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GetGoogleAuth, GoogleAuthResponse } from '@/apis/authAPI';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from '@/apis/axiosInstance';
import { API_BASE_URL } from '@/constants';

export default function GoogleCallback() {
  const router = useRouter();

  const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

  // const mutation = useMutation<GoogleAuthResponse, Error, void>({
  //   mutationFn: GetGoogleAuth,
  //   onSuccess: (data: any) => {
  //     console.log(data);
  //     if (data.registered === true) {
  //       const { accessToken } = data;
  //       saveTokenToCookie(accessToken as string);
  //       router.push('/');
  //     } else {
  //       router.push('/signup');
  //     }
  //   },
  //   onError: (error: any) => {
  //     console.log('토큰을 확인할 수 없습니다.', error);
  //   },
  // } as unknown as UseMutationOptions<GoogleAuthResponse, Error, void>);

  useEffect(() => {
    const fetchGoogleCallback = async () => {
      try {
        if (code) {
          const response = await axiosInstance.get(`${API_BASE_URL}/auth/google/callback?code=${code}`);
          console.log(response.data);
        }
      } catch (error) {
        console.error('Callback fetching failed.', error);
      }
    };

    if (code) {
      fetchGoogleCallback();
    }
  }, [code]);

  return <div></div>;
}

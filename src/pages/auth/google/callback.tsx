import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { GoogleAuthResponse } from '@/apis/authAPI';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from '@/apis/axiosInstance';
import { API_BASE_URL } from '@/constants';

const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

export default function GoogleCallback() {
  const router = useRouter();

  async function GetGoogleAuth(): Promise<GoogleAuthResponse> {
    const response = await axiosInstance.get(`${API_BASE_URL}/auth/google/callback?code=${code}`);
    return response.data;
  }

  const queryClient = useQueryClient();
  const mutation = useMutation<GoogleAuthResponse, Error, void>({
    mutationFn: GetGoogleAuth,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['googleAuth'] });
      console.log(data);
      if (data.registered === true && code) {
        const { accessToken } = data;
        saveTokenToCookie(accessToken as string);
        router.push('/');
      } else {
        router.push({
          pathname: '/signup',
          query: { email: data.email, profileToken: String(data.profileToken) },
        });
      }
    },
    onError: (error: any) => {
      console.log('토큰을 확인할 수 없습니다.', error);
    },
  } as unknown as UseMutationOptions<GoogleAuthResponse, Error, void>);

  useEffect(() => {
    mutation.mutate();
  }, [code]);

  // useEffect(() => {
  //   const fetchGoogleCallback = async () => {
  //     try {
  //       if (code) {
  //         const response = await axiosInstance.get(`${API_BASE_URL}/auth/google/callback?code=${code}`);
  //         console.log(response.data);
  //         if (response.data.registered === true) {
  //           const { accessToken } = response.data;
  //           saveTokenToCookie(accessToken as string);
  //           router.push('/');
  //         } else {
  //           router.push('/signup');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Callback fetching failed.', error);
  //     }
  //   };
  //   fetchGoogleCallback();
  // }, [code]);

  return <div></div>;
}

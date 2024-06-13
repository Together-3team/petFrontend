import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { KakaoAuthResponse } from '@/apis/authAPI';
import { setCookie } from '@/utils/cookie';
import axiosInstance from '@/apis/axiosInstance';
import { API_BASE_URL } from '@/constants';

const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

export default function KakaoCallback() {
  const router = useRouter();

  async function GetKakaoAuth(): Promise<KakaoAuthResponse> {
    const response = await axiosInstance.get(`${API_BASE_URL}/auth/kakao/callback?code=${code}`);
    return response.data;
  }

  const queryClient = useQueryClient();
  const mutation = useMutation<KakaoAuthResponse, Error, void>({
    mutationFn: GetKakaoAuth,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['kakaoAuth'] });
      console.log(data);
      if (data.registered === true && code) {
        const { accessToken } = data;
        setCookie({
          name: 'token',
          value: accessToken,
          option: {
            path: '/',
            HttpOnly: true,
          },
        });
        console.log(accessToken);
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
  } as unknown as UseMutationOptions<KakaoAuthResponse, Error, void>);

  useEffect(() => {
    mutation.mutate();
  }, [code]);

  return <div></div>;
}

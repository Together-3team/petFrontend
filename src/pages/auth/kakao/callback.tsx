import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { KakaoAuthResponse } from '@/apis/authApi';
import { useCookies } from 'react-cookie';
import authAxiosInstance from '@/apis/authAxiosInstance';

const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

export default function KakaoCallback() {
  const router = useRouter();
  const [cookies, setCookie, removeCookies] = useCookies(['accessToken', 'refreshToken']);

  async function getKakaoAuth(): Promise<KakaoAuthResponse> {
    const response = await authAxiosInstance.get(`/auth/kakao/callback?code=${code}`);
    return response.data;
  }

  const { mutateAsync: mutation } = useMutation<KakaoAuthResponse, Error, void>({
    mutationKey: ['kakaoAuth'],
    mutationFn: getKakaoAuth,
    onSuccess: (data: KakaoAuthResponse) => {
      if (data.registered === true && code) {
        const { accessToken, refreshToken } = data;
        setCookie('accessToken', accessToken, {
          path: '/',
        });
        setCookie('refreshToken', refreshToken, {
          path: '/',
        });
        router.push('/');
      } else {
        router.push({
          pathname: '/signup',
          query: { email: data.email, profileToken: String(data.profileToken) },
        });
      }
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  } as unknown as UseMutationOptions<KakaoAuthResponse, Error, void>);

  useEffect(() => {
    mutation();
  }, [mutation]);

  return <div></div>;
}

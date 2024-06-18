import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GoogleAuthResponse } from '@/apis/authApi';
import { useCookies } from 'react-cookie';
import authAxiosInstance from '@/apis/authAxiosInstance';

const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

export default function GoogleCallback() {
  const router = useRouter();
  const [cookies, setCookie, removeCookies] = useCookies(['accessToken', 'refreshToken']);

  async function getGoogleAuth(): Promise<GoogleAuthResponse> {
    const response = await authAxiosInstance.get(`/auth/google/callback?code=${code}`);
    return response.data;
  }

  const mutation = useMutation<GoogleAuthResponse, Error, void>({
    mutationKey: ['googleAuth'],
    mutationFn: getGoogleAuth,
    onSuccess: (data: GoogleAuthResponse) => {
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
  } as unknown as UseMutationOptions<GoogleAuthResponse, Error, void>);

  useEffect(() => {
    mutation.mutate();
  }, [mutation]);

  return <div></div>;
}

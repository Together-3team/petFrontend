import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { GoogleAuthResponse } from '@/apis/authAPI';
import { setCookie } from '@/utils/cookie';
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
    onSuccess: (data: GoogleAuthResponse) => {
      queryClient.invalidateQueries({ queryKey: ['googleAuth'] });
      console.log(data);
      if (data.registered === true && code) {
        const { accessToken } = data;
        setCookie({
          name: 'token',
          value: accessToken,
          option: {
            path: '/',
            httpOnly: true,
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
    onError: (error: unknown) => {
      console.log(error);
    },
  } as unknown as UseMutationOptions<GoogleAuthResponse, Error, void>);

  useEffect(() => {
    mutation.mutate();
  }, [code]);

  return <div></div>;
}

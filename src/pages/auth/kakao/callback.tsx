import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { KakaoAuthResponse } from '@/apis/authAPI';
import saveTokenToCookie from '@/utils/cookie';
import axiosInstance from '@/apis/axiosInstance';
import { API_BASE_URL } from '@/constants';

export default function KakaoCallback() {
  const router = useRouter();

  const code = typeof window !== 'undefined' && new URL(window.location.toString()).searchParams.get('code');

  async function GetKakaoAuth(): Promise<KakaoAuthResponse> {
    const response = await axiosInstance.get(`${API_BASE_URL}/auth/kakao/callback?code=${code}`);
    return response.data;
  }

  const mutation = useMutation<KakaoAuthResponse, Error, void>({
    mutationFn: GetKakaoAuth,
    onSuccess: (data: any) => {
      console.log(data);
      if (data.registered === true) {
        const { accessToken } = data;
        saveTokenToCookie(accessToken as string);
        router.push('/');
      } else {
        router.push('/signup');
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

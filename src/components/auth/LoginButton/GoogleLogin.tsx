'use client';

import classNames from 'classnames/bind';
import GoogleLogo from '@/assets/svgs/google-logo.svg';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GetGoogleAuth, GoogleAuthResponse } from '@/apis/authAPI';
import saveTokenToCookie from '@/utils/cookie';
import { useRouter } from 'next/router';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function GoogleLogin() {
  const router = useRouter();
  const mutation = useMutation<GoogleAuthResponse, Error, void>({
    mutationFn: GetGoogleAuth,
    onSuccess: data => {
      console.log(data);
      if (data.registered === true) {
        const { accessToken } = data;
        saveTokenToCookie(accessToken as string);
        router.push('/onboarding');
      } else {
        router.push('/signup');
      }
    },
    onError: error => {
      console.log('토큰을 확인할 수 없습니다.', error);
    },
  } as UseMutationOptions<GoogleAuthResponse, Error, void>);

  function handleClick() {
    mutation.mutate();
  }

  return (
    <div className={cx('googleButton')} onClick={handleClick}>
      <GoogleLogo />
      <span>Google로 계속하기</span>
    </div>
  );
}

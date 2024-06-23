import classNames from 'classnames/bind';
import { API_BASE_URL } from '@/constants';
import KakaoLogo from '@/assets/svgs/kakao-logo.svg';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function KakaoLogin() {
  return (
    <>
      <a href={API_BASE_URL + '/auth/kakao/server'}>
        <div className={cx('kakaoButton')}>
          <KakaoLogo />
          <span>카카오로 계속하기(서버)</span>
        </div>
      </a>
      <a href={API_BASE_URL + '/auth/kakao/local'}>
        <div className={cx('kakaoButton')}>
          <KakaoLogo />
          <span>카카오로 계속하기(로컬)</span>
        </div>
      </a>
    </>
  );
}

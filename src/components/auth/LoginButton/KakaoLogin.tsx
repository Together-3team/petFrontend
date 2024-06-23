import classNames from 'classnames/bind';
import { API_BASE_URL } from '@/constants';
import KakaoLogo from '@/assets/svgs/kakao-logo.svg';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function KakaoLogin() {
  return (
    <>
      <a href={API_BASE_URL + `/auth/kakao/${process.env.NEXT_PUBLIC_AUTH_END}`}>
        <div className={cx('kakaoButton')}>
          <KakaoLogo />
          <span>카카오로 계속하기</span>
        </div>
      </a>
    </>
  );
}

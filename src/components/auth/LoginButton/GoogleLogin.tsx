import classNames from 'classnames/bind';
import { API_BASE_URL } from '@/constants';
import GoogleLogo from '@/assets/svgs/google-logo.svg';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function GoogleLogin() {
  return (
    <>
      <a href={API_BASE_URL + `/auth/google/${process.env.NEXT_PUBLIC_AUTH_END}`}>
        <div className={cx('googleButton')}>
          <GoogleLogo />
          <span>구글로 계속하기</span>
        </div>
      </a>
    </>
  );
}

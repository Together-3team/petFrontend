import Link from 'next/link';
import classNames from 'classnames/bind';
import GoogleLogo from '@/assets/svgs/google-logo.svg';
import styles from './Login.module.scss';
import { API_BASE_URL } from '@/constants';

const cx = classNames.bind(styles);

export default function GoogleLogin() {
  return (
    <Link href={API_BASE_URL + '/auth/google'}>
      <div className={cx('googleButton')}>
        <GoogleLogo />
        <span>Google로 계속하기</span>
      </div>
    </Link>
  );
}

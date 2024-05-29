import { GOOGLE_AUTH_URL } from '@/constants/oAuth';
import Link from 'next/link';
import classNames from 'classnames/bind';
import GoogleLogo from '@/assets/svgs/google-logo.svg';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function GoogleLogin() {
  return (
    <Link href={GOOGLE_AUTH_URL}>
      <div className={cx('googleButton')}>
        <GoogleLogo />
        <span>Google로 계속하기</span>
      </div>
    </Link>
  );
}

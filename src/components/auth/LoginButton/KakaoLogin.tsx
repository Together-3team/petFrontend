import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import Link from 'next/link';
import classNames from 'classnames/bind';
import KakaoLogo from '@/assets/svgs/kakao-logo.svg';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

export default function KakaoLogin() {
  return (
    <Link href={KAKAO_AUTH_URL}>
      <div className={cx('kakaoButton')}>
        <KakaoLogo />
        <span>카카오로 계속하기</span>
      </div>
    </Link>
  );
}

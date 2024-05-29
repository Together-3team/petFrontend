import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';

const cx = classNames.bind(styles);

export default function Login() {
  return (
    <div className={cx('loginButton')}>
      <KakaoLogin />
      <GoogleLogin />
    </div>
  );
}

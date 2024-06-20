import classNames from 'classnames/bind';
import Header from '@/components/common/Layout/Header';
import SignupForm from '@/components/auth/SignupForm';
import styles from './Signup.module.scss';
import BackButton from '@/components/common/Button/BackButton';

const cx = classNames.bind(styles);

export default function Signup() {
  return (
    <div className={cx('signupLayout')}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton href="/my" />
          </Header.Left>
        </Header.Box>
      </Header.Root>
      <div>
        <SignupForm />
      </div>
    </div>
  );
}

import classNames from 'classnames/bind';
import BackButton from '@/components/common/Button/BackButton';
import SignupForm from '@/components/auth/SignupForm';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

export default function Signup() {
  return (
    <div className={cx('signupLayout')}>
      <div className={cx('buttonArea')}>
        <BackButton />
      </div>
      <div>
        <SignupForm />
      </div>
    </div>
  );
}

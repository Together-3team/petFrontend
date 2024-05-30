import classNames from 'classnames/bind';

import NavBottom from '@/components/common/Nav/Bottom';
import styles from './MainFooter.module.scss';

const cx = classNames.bind(styles);

export default function MainFooter() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('bottomNav')}>
        <NavBottom />
      </div>
    </footer>
  );
}

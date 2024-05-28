import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './RootLayout.module.scss';
import MainFooter from '../Main/Footer';

const cx = classNames.bind(styles);

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className={cx('container')}>
      <div className={cx('background')} />
      <div className={cx('home')}></div>
      <div className={cx('contents')}>
        <div className={cx('main')}>{children}</div>
        <MainFooter />
      </div>
    </div>
  );
}

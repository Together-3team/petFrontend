import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './MainLayout.module.scss';
import MainHeader from './Header';
import MainFooter from './Footer';

const cx = classNames.bind(styles);

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={cx('contents')}>
      <MainHeader />
      {children}
      <MainFooter />
    </div>
  );
}

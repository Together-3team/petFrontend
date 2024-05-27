import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './RootLayout.module.scss';

const cx = classNames.bind(styles);

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className={cx('background')} />
      <div className={cx('hero')}></div>
      <div className={cx('contents')}>{children}</div>
    </>
  );
}

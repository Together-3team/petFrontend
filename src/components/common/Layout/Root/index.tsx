import { PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './RootLayout.module.scss';
import LogoIcon from '@/assets/svgs/heart.svg';
import { PORTAL_ID } from '@/constants/portal';

const cx = classNames.bind(styles);

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className={cx('container')}>
      <div className={cx('homeBackground')} />
      <div className={cx('heroContainer')}>
        {/* hero 내용 분리 예정 */}
        <div className={cx('hero')}>
          <header>
            {/* 로고 이미지로 대체 예정 */}
            <LogoIcon />
            <p>반려동물 용품</p>
            <p>공구로 더 저렴하게!</p>
          </header>
          <footer>
            <button type="button">친구에게도 알려주기</button>
          </footer>
        </div>
      </div>
      <div className={cx('main')}>
        <div className={cx('appBackground')} />
        <div className={cx('contents')}>{children}</div>
        <div id={PORTAL_ID.TOAST} className={styles.rootToast}></div>
        <div id={PORTAL_ID.MODAL}></div>
      </div>
    </div>
  );
}

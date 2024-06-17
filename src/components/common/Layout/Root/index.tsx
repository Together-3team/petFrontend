import { PropsWithChildren } from 'react';

import styles from './RootLayout.module.scss';
import LogoIcon from '@/assets/svgs/heart.svg';
import { PORTAL_ID } from '@/constants/portal';
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.homeBackground} />
      <div className={styles.heroContainer}>
        {/* hero 내용 분리 예정 */}
        <div className={styles.hero}>
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
      <div className={styles.mainBox}>
        <div>
          <div className={styles.appBackground} />
          <div className={styles.contents}>{children}</div>
          <div id={PORTAL_ID.TOAST} className={styles.rootToast}></div>
          <div id={PORTAL_ID.MODAL}></div>
        </div>
      </div>
    </div>
  );
}

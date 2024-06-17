import { PropsWithChildren } from 'react';

import styles from './RootLayout.module.scss';
import { PORTAL_ID } from '@/constants/portal';
import IntroView from '../IntroView';
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <div className={styles.homeBackground} />
      <div className={styles.introViewBox}>
        <IntroView />
      </div>
      <div className={styles.mainBox}>
        <div className={styles.main}>
          <div className={styles.appBackground} />
          <div className={styles.contents}>{children}</div>
          <div id={PORTAL_ID.TOAST} className={styles.rootToast}></div>
          <div id={PORTAL_ID.MODAL}></div>
        </div>
      </div>
    </div>
  );
}

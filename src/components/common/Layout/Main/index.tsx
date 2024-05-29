import { PropsWithChildren } from 'react';

import styles from './MainLayout.module.scss';
import MainHeader from './Header';
import MainFooter from './Footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.contents}>
      <MainHeader />
      <main className={styles.main}>{children}</main>
      <div className={styles.relativeBox}>
        <button className={styles.topButton}>top</button>
      </div>
      <MainFooter />
    </div>
  );
}

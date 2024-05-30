import { PropsWithChildren } from 'react';

import styles from './MainLayout.module.scss';
import MainHeader from './Header';
import MainFooter from './Footer';

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.contents}>
      <MainHeader />
      <main className={styles.main}>{children}</main>
      <div className={styles.fixedContainer}>
        <div className={styles.fixedBox}>
          <button type="button" onClick={() => alert('top')}>
            top
          </button>
          <button type="button" onClick={() => alert('category')}>
            category
          </button>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

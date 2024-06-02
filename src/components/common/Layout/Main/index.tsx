import { PropsWithChildren } from 'react';

import styles from './MainLayout.module.scss';
import MainHeader from './Header';
import MainFooter from './Footer';
import CategoryButton from '../../Button/Category';

const CATEGORIES = ['전체', '강아지', '고양이'];

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
          <CategoryButton
            categories={CATEGORIES}
            initialActiveCategory={CATEGORIES[0]}
            onClick={category => console.log(category)}
          />
        </div>
      </div>
      <MainFooter />
    </div>
  );
}

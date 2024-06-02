import NavTop from '@/components/common/Nav/Top';

import styles from './MainHeader.module.scss';

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <p>서비스 명</p>
      <div>
        검색 <input type="search" />
      </div>
      <NavTop />
    </header>
  );
}

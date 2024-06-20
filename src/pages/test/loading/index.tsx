import Loading from '@/components/common/Loading';

import styles from './LoadingPage.module.scss';
import Header from '@/components/common/Layout/Header';
import LogoFull from '@/components/common/Icon/LogoFull';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';

export default function LoadingPage() {
  return (
    <div className={styles.layout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <LogoFull />
          </Header.Left>
          <Header.Right>
            <SearchButton />
            <CartButton />
          </Header.Right>
        </Header.Box>
      </Header.Root>
      <div className={styles.contents}>
        <Loading />
      </div>
    </div>
  );
}

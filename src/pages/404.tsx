import styles from './404.module.scss';
import CartButton from '@/components/common/Button/Cart';
import SearchButton from '@/components/common/Button/Search';
import LogoFull from '@/components/common/Icon/LogoFull';
import Header from '@/components/common/Layout/Header';
import NotFound from '@/components/common/NotFound';

export default function NotFoundPage() {
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
        <NotFound />
      </div>
    </div>
  );
}

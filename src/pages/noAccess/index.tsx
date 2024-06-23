import Header from '@/components/common/Layout/Header';
import LogoFull from '@/components/common/Icon/LogoFull';
import SearchButton from '@/components/common/Button/Search';
import CartButton from '@/components/common/Button/Cart';
import NoAccess from '@/components/common/NoAccess';
import styles from './NoAccessPage.module.scss';

export default function NoAccessPage() {
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
        <NoAccess />
      </div>
    </div>
  );
}

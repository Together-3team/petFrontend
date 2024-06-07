import Header from '@/components/common/Layout/Header';
import styles from './Order.module.scss';
import BackButton from '@/components/common/BackButton';
import ScrollTopButton from '@/components/common/Button/ScrollTop';

export default function Order() {
  return (
    <div className={styles.orderLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>주문내역</h1>
        </Header.Box>
      </Header.Root>
      <ScrollTopButton />
    </div>
  );
}

import classNames from 'classnames/bind';
import Header from '@/components/common/Layout/Header';

import BackButton from '@/components/common/BackButton';

import styles from './Order.module.scss';
import OrderFilterBar from './OrderFilterBar';

const cx = classNames.bind(styles);

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
      <OrderFilterBar />
    </div>
  );
}

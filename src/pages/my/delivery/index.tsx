import classNames from 'classnames/bind';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import styles from './Delivery.module.scss';

const cx = classNames.bind(styles);

export default function MyDeliveryPage() {
  return (
    <div style={{ margin: '20px 16px' }}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1 className={cx('title')}>배송지 목록</h1>
        </Header.Box>
      </Header.Root>
    </div>
  );
}

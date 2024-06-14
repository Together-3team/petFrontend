import classNames from 'classnames/bind';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import styles from './Delivery.module.scss';
import DeliveryCard from '@/components/common/DeliveryCard';
import { useEffect } from 'react';
import DeliveryEmptyView from '@/components/delivery/EmptyView';

interface DeliveryInfo {
  id: number;
  name: string;
  recipient: string;
  recipientPhoneNumber: string;
  zipCode: number;
  address: string;
  detailedAddress: string;
  isDefault: boolean;
}

const cx = classNames.bind(styles);

export default function MyDeliveryPage() {
  useEffect(() => {});
  const deliverlies: DeliveryInfo[] = [
    // {
    //   id: 1,
    //   name: '김견주 집',
    //   recipient: '김견주',
    //   recipientPhoneNumber: '010-1111-2222',
    //   zipCode: 0o2233,
    //   address: '서울 마포구 마포로 85 ',
    //   detailedAddress: '102동 1012호',
    //   isDefault: true,
    // },
    // {
    //   id: 2,
    //   name: '김견주 회사',
    //   recipient: '김견주',
    //   recipientPhoneNumber: '010-1111-3333',
    //   zipCode: 12393,
    //   address: '서울 마포구 마포로 85 ',
    //   detailedAddress: '102동 1013호',
    //   isDefault: true,
    // },
  ];
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
      {deliverlies.length !== 0 ? (
        deliverlies.map(deliveryInfo => {
          return <DeliveryCard key={deliveryInfo.id} deliveryInfo={deliveryInfo} />;
        })
      ) : (
        <DeliveryEmptyView />
      )}
    </div>
  );
}

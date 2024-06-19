import classNames from 'classnames/bind';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import styles from './Delivery.module.scss';
import DeliveryCard from '@/components/common/DeliveryCard';
import { useEffect, useRef } from 'react';
import DeliveryEmptyView from '@/components/delivery/EmptyView';
import Button from '@/components/common/Button';
import { DeliveryInfo } from '@/types/components/delivery';

const cx = classNames.bind(styles);

export default function MyDeliveryPage() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const topContent = topContentRef.current;

    if (!button || !topContent) {
      return;
    }

    const topContentRect = topContent.offsetHeight;
    const buttonHeight = button.offsetHeight;

    if (topContentRect + buttonHeight > window.innerHeight) {
      button.style.position = 'absolute';
      button.style.bottom = `32px`;
      button.style.left = '50%';
      button.style.transform = 'translate(-50%, 0)';
    } else {
      button.style.position = 'fixed';
      button.style.bottom = '32px';
    }
  }, []);

  useEffect(() => {});
  const deliverlies: DeliveryInfo[] = [
    {
      id: 1,
      name: '김견주 집',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-2222',
      zipCode: 0o2233,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1012호',
      isDefault: true,
    },
    {
      id: 2,
      name: '김견주 회사',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-3333',
      zipCode: 12393,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1013호',
      isDefault: true,
    },
    {
      id: 2,
      name: '김견주 회사',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-3333',
      zipCode: 12393,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1013호',
      isDefault: true,
    },
    {
      id: 2,
      name: '김견주 회사',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-3333',
      zipCode: 12393,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1013호',
      isDefault: true,
    },
    {
      id: 2,
      name: '김견주 회사',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-3333',
      zipCode: 12393,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1013호',
      isDefault: true,
    },
    {
      id: 2,
      name: '김견주 회사',
      recipient: '김견주',
      recipientPhoneNumber: '010-1111-3333',
      zipCode: 12393,
      address: '서울 마포구 마포로 85 ',
      detailedAddress: '102동 1013호',
      isDefault: true,
    },
  ];
  return (
    <div className={cx('delivery')} ref={topContentRef}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1 className={cx('title')}>배송지 목록</h1>
        </Header.Box>
      </Header.Root>
      {deliverlies.length !== 0 ? (
        <div className={cx('deliveries')}>
          {deliverlies.map(deliveryInfo => {
            return <DeliveryCard key={deliveryInfo.id} deliveryInfo={deliveryInfo} />;
          })}
        </div>
      ) : (
        <DeliveryEmptyView />
      )}
      <div className={cx('button')} ref={buttonRef}>
        <Button size="large" backgroundColor="$color-pink-main">
          배송지 추가
        </Button>
      </div>
    </div>
  );
}

import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import { DeliveryInfo } from '@/types/components/delivery';
import styles from './OrderDeliveryCard.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface DeliveryCardProps {
  defaultDelivery: DeliveryInfo | undefined;
}

export default function OrderDeliveryCard({ defaultDelivery }: DeliveryCardProps) {
  // const { id, name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, isDefault } = deliveryInfo;

  const router = useRouter();
  // const { delivery } = router.query;
  const [delivery, setDelivery] = useState(defaultDelivery);

  const handleChangeButtonClick = () => {
    router.push(`payment/delivery?delivery=${delivery}`);
  };

  return (
    <>
      <label>배송지</label>
      {delivery && (
        <>
          <button type="button" onClick={handleChangeButtonClick}>
            변경
          </button>
          <div className={cx('deliveryCard')}>
            <div className={cx('addressName')}>
              <span>{delivery.name}</span>
            </div>
            <p className={cx('recipientInfo')}>
              {delivery.recipient} ･ {delivery.recipientPhoneNumber}
            </p>
            <p>
              {delivery.address}, {delivery.detailedAddress}
            </p>
            <p className={cx('zipCode')}>{delivery.zipCode}</p>
          </div>
        </>
      )}
    </>
  );
}

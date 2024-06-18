import classNames from 'classnames/bind';
import styles from './DeliveryCard.module.scss';
import Button from '../Button';
import Tag from '../Tag';
import { DeliveryInfo } from '@/types/components/delivery';

const cx = classNames.bind(styles);

export default function DeliveryCard({ deliveryInfo }: { deliveryInfo: DeliveryInfo }) {
  const { id, name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, isDefault } = deliveryInfo;

  return (
    <div className={cx('deliveryCard')}>
      <div className={cx('addressName')}>
        <span>{name}</span>
        {isDefault && (
          <Tag size="medium" color="##F3F4F7" fontColor="#5A6072">
            기본 배송지
          </Tag>
        )}
      </div>
      <p className={cx('recipientInfo')}>
        {recipient} ･ {recipientPhoneNumber}
      </p>
      <p>
        {address}, {detailedAddress}
      </p>
      <p>{zipCode}</p>
      <div className={cx('buttons')}>
        <Button size="extraSmall" backgroundColor="$color-white-gray-gray">
          수정
        </Button>
        <Button size="extraSmall" backgroundColor="$color-white-gray-gray">
          삭제
        </Button>
      </div>
    </div>
  );
}

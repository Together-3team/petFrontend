import classNames from 'classnames/bind';
import styles from './DeliveryCard.module.scss';
import Button from '../Button';

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

export default function DeliveryCard({ deliveryInfo }: { deliveryInfo: DeliveryInfo }) {
  const { id, name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, isDefault } = deliveryInfo;

  return (
    <div>
      <div className={cx('addressName')}>
        <span>{name}</span>
        {isDefault && <span>기본 배송지</span>}
      </div>
      <p className={cx('recipientInfo')}>
        {recipient} ･ {recipientPhoneNumber}
      </p>
      <p>
        {address}, {detailedAddress}
      </p>
      <p>{zipCode}</p>
      <Button size="small" backgroundColor="$color-white-gray">
        수정
      </Button>
      <Button size="small" backgroundColor="$color-white-gray">
        삭제
      </Button>
    </div>
  );
}

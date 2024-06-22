import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import { DeliveryInfo } from '@/types/components/delivery';
import styles from './OrderDeliveryCard.module.scss';
import { useEffect } from 'react';
import axiosInstance from '@/apis/axiosInstance';
import { isAxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import Button from '@/components/common/Button';

const cx = classNames.bind(styles);

interface DeliveryCardProps {
  delivery: DeliveryInfo | undefined;
  setDelivery: React.Dispatch<React.SetStateAction<DeliveryInfo | undefined>>;
}

export default function OrderDeliveryCard({ delivery, setDelivery }: DeliveryCardProps) {
  const router = useRouter();
  const { selectedAddress } = router.query;
  const selectedAddressId = Number(selectedAddress);

  const { showToast } = useToast();

  useEffect(() => {
    const setSelectedDelivery = async () => {
      if (selectedAddressId) {
        try {
          const res = await axiosInstance.get(`/deliveries/${selectedAddressId}`);
          const data = res.data;
          setDelivery(data);
        } catch (error) {
          if (!isAxiosError(error)) {
            // `AxiosError`가 아닌 경우
            showToast({
              status: 'error',
              message: FETCH_ERROR_MESSAGE.UNKNOWN,
            });
            return;
          }
          // `AxiosError`인 경우 에러 처리
          if (!error.response) {
            showToast({
              status: 'error',
              message: FETCH_ERROR_MESSAGE.REQUEST,
            });
            return;
          }
          const status = error.response?.status;
          switch (status) {
            case 404:
              showToast({
                status: 'error',
                message: SERVER_ERROR_MESSAGE.USER.NOT_FOUND,
              });
              return;
          }
        }
      }
    };
    setSelectedDelivery();
  }, [selectedAddressId, showToast, setDelivery]);

  const handleChangeButtonClick = () => {
    router.replace(`payment/delivery?selectedAddress=${delivery?.id}`);
  };

  const handleAddDeliveryButtonClick = () => {
    router.push({
      pathname: `/my/delivery/add`,
      query: '/payment/delivery',
    });
  };
  return (
    <div className={cx('delivery')}>
      <div className={cx('titleAndButton')}>
        <label className={cx('title')}>배송지</label>
        {delivery && (
          <button type="button" onClick={handleChangeButtonClick} className={cx('changeButton')}>
            변경
          </button>
        )}
      </div>
      {delivery ? (
        <div className={cx('deliveryCard')}>
          <div className={cx('addressName')}>
            <span>{delivery.name}</span>
          </div>
          <p className={cx('recipientInfo')}>
            {delivery.recipient} ･ {delivery.recipientPhoneNumber}
          </p>
          <p className={cx('addressInfo')}>
            {delivery.address}, {delivery.detailedAddress}
          </p>
          <p className={cx('zipCode')}>{delivery.zipCode}</p>
        </div>
      ) : (
        <div className={cx('noDeliveryContainer')}>
          <p className={cx('noDeliveryDescription')}>아직 배송지가 등록되지 않았어요.</p>
          <Button size="small" backgroundColor="$color-pink-main" onClick={handleAddDeliveryButtonClick}>
            배송지 추가
          </Button>
        </div>
      )}
    </div>
  );
}

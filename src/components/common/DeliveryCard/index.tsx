import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import { isAxiosError } from 'axios';
import axiosInstance from '@/apis/axiosInstance';

import Button from '../Button';
import Tag from '../Tag';
import { DeliveryInfo } from '@/types/components/delivery';
import useToast from '@/hooks/useToast';
import { ERROR_MESSAGE, FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import styles from './DeliveryCard.module.scss';
import useModal from '@/hooks/useModal';
import BottomModal from '../Modal/Base/BottomModal';

const cx = classNames.bind(styles);

interface DeliveryCardProps {
  deliveryInfo: DeliveryInfo;
  deliveries: DeliveryInfo[];
  setDeliveries: React.Dispatch<React.SetStateAction<DeliveryInfo[]>>;
  checked?: boolean;
}

export default function DeliveryCard({ deliveryInfo, deliveries, setDeliveries, checked }: DeliveryCardProps) {
  const { id, name, recipient, recipientPhoneNumber, zipCode, address, detailedAddress, isDefault } = deliveryInfo;
  const router = useRouter();
  const { showToast } = useToast();
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  const handleEditButtonClick = () => {
    router.push('/payment/delivery/edit');
  };

  const handleModalButtonClick = () => {
    if (checked) {
      showToast({
        status: 'error',
        message: ERROR_MESSAGE.ISDEFAULT,
      });
      return;
    }
    handleModalOpen();
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axiosInstance.delete(`/deliveries/${id}`);
      // setIsVisible(id, false); // 삭제 성공 시 카드를 숨김
      const nextDeliveries = deliveries.filter(deliveryInfo => deliveryInfo.id !== id);
      setDeliveries(nextDeliveries);
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
        case 400:
          showToast({
            status: 'error',
            message: SERVER_ERROR_MESSAGE.USER.NOT_FOUND,
          });
          return;
      }
    }
  };

  return (
    <>
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
        <p className={cx('zipCode')}>{zipCode}</p>
        <div className={cx('buttons')}>
          <Button size="extraSmall" backgroundColor="$color-white-gray-gray" onClick={handleEditButtonClick}>
            수정
          </Button>
          <Button size="extraSmall" backgroundColor="$color-white-gray-gray" onClick={handleModalButtonClick}>
            삭제
          </Button>
        </div>
      </div>
      <BottomModal isOpen={modalOpen} onClose={handleModalClose}>
        <div className={cx('modalContents')}>
          <div className={cx('modalTitle')}>배송지를 삭제하시겠어요?</div>
          <div className={cx('modalButtons')}>
            <Button size="medium" backgroundColor="$color-white" onClick={handleModalClose}>
              취소
            </Button>
            <Button size="medium" backgroundColor="$color-gray-800" onClick={handleDeleteButtonClick}>
              삭제
            </Button>
          </div>
        </div>
      </BottomModal>
    </>
  );
}

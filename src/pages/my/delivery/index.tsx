import classNames from 'classnames/bind';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import styles from './Delivery.module.scss';
import DeliveryCard from '@/components/common/DeliveryCard';
import { useEffect, useRef, useState } from 'react';
import DeliveryEmptyView from '@/components/delivery/EmptyView';
import Button from '@/components/common/Button';
import { DeliveryInfo } from '@/types/components/delivery';
import useToast from '@/hooks/useToast';
import axios from '@/apis/axiosInstance';
import { isAxiosError } from 'axios';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';

const cx = classNames.bind(styles);

const BOTTOM_BOX_ID = 'bottomBox';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MTg2OTIyMDAsImV4cCI6MTcxODY5OTQwMH0.0FbXlHrTeLloQAWOw4BDDQ5xln52l4UzSiI2WP4eskw';

export default function MyDeliveryPage() {
  const [deliveries, setDeliveries] = useState<DeliveryInfo[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const topContentRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast(BOTTOM_BOX_ID);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios('/deliveries', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }); // 서버에서 옵션 데이터를 받아오는 API 엔드포인트
        const deliveries: DeliveryInfo[] = res.data;
        setDeliveries(deliveries);
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
    };
    fetchOptions();
  }, [showToast]);

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
  }, [deliveries]);

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
      {deliveries.length !== 0 ? (
        <div className={cx('deliveries')}>
          {deliveries.map(deliveryInfo => {
            return (
              <DeliveryCard
                key={deliveryInfo.id}
                deliveryInfo={deliveryInfo}
                deliveries={deliveries}
                setDeliveries={setDeliveries}
              />
            );
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

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import { isAxiosError } from 'axios';

import axiosInstance from '@/apis/axiosInstance';
import BackButton from '@/components/common/Button/BackButton';
import Header from '@/components/common/Layout/Header';
import DeliveryCard from '@/components/common/DeliveryCard';
import DeliveryEmptyView from '@/components/delivery/EmptyView';
import Button from '@/components/common/Button';
import { DeliveryInfo } from '@/types/components/delivery';
import useToast from '@/hooks/useToast';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import styles from './Delivery.module.scss';

const cx = classNames.bind(styles);

export default function MyDeliveryPage() {
  const [deliveries, setDeliveries] = useState<DeliveryInfo[]>([]);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axiosInstance('/deliveries'); // 서버에서 옵션 데이터를 받아오는 API 엔드포인트
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

  const handleAddDeliveryButton = () => {
    router.push({
      pathname: `/my/delivery/add`,
      query: router.asPath,
    });
  };

  return (
    <div className={cx('layout')}>
      <div className={cx('delivery')}>
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
                  checked={deliveryInfo.isDefault}
                  setDeliveries={setDeliveries}
                />
              );
            })}
          </div>
        ) : (
          <DeliveryEmptyView />
        )}
      </div>
      <div className={cx('button')}>
        <Button size="large" backgroundColor="$color-pink-main" onClick={handleAddDeliveryButton}>
          배송지 추가
        </Button>
      </div>
    </div>
  );
}

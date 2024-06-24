import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getLikeStatus, likeProduct, unlikeProduct } from '@/apis/zzim';
import Sole from '@/assets/svgs/sole.svg';
import RedSole from '@/assets/svgs/sole-red.svg';
import GraySole from '@/assets/svgs/sole-gray.svg';
import { zzimsQueries } from '@/apis/product/queries';
import styles from './Zzim.module.scss';
import { isAxiosError } from 'axios';
import useToast from '@/hooks/useToast';
import { FETCH_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '@/constants/errorMessage';
import useAuth from '@/hooks/useAuth';
import useModal from '@/hooks/useModal';
import BottomModal from '../Modal/Base/BottomModal';
import Button from '../Button';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Zzim {
  className?: string;
  color: 'gray' | 'white';
  productId: number;
  initialIsZzimed?: boolean;
}

interface ProductUserInfo {
  productId: number;
  userAction: 'LIKE_PRODUCT' | 'UNLIKE_PRODUCT';
}

const cx = classNames.bind(styles);

//className에서 zzim 위치 조정
export default function Zzim({ className, color, productId, initialIsZzimed }: Zzim) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { isLogin } = useAuth();
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  const router = useRouter();

  const [isZzimed, setIsZzimed] = useState(initialIsZzimed);

  const likesMutation = useMutation({
    mutationFn: async ({ productId, userAction }: ProductUserInfo) => {
      if (userAction === 'LIKE_PRODUCT') {
        await likeProduct(productId);
      } else {
        await unlikeProduct(productId);
      }
    },
    onMutate: async ({ productId, userAction }) => {
      await queryClient.cancelQueries({ queryKey: ['likeStatus', productId] });

      const prevLikeStatus = queryClient.getQueryData(['likeStatus', productId]);

      queryClient.setQueryData(['likeStatus', productId], () => userAction === 'LIKE_PRODUCT');
      setIsZzimed(userAction === 'LIKE_PRODUCT');

      return { prevLikeStatus };
    },
    onError: (error, { productId }, context) => {
      queryClient.setQueryData(['likeStatus', productId], context?.prevLikeStatus);
      setIsZzimed(context?.prevLikeStatus as boolean | undefined);
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
      console.log(status);
      switch (status) {
        case 500:
          showToast({
            status: 'error',
            message: SERVER_ERROR_MESSAGE.DEFAULT,
          });
          return;
      }
    },
    onSettled: (data, err, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ['likeStatus', productId],
      });
      zzimsQueries.invalidateQueries();
    },
  });

  const handleZzimButtonClick = (userAction: 'UNLIKE_PRODUCT' | 'LIKE_PRODUCT') => {
    if (!isLogin) {
      handleModalOpen();
      return;
    }
    likesMutation.mutate({
      productId: productId,
      userAction,
    });
  };

  const handleLoginButtonClick = () => {
    router.replace({ pathname: '/my', query: { prevPath: router.asPath } });
  };

  return (
    <>
      <button
        type="button"
        className={cx('zzimButton', className)}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          handleZzimButtonClick(isZzimed ? 'UNLIKE_PRODUCT' : 'LIKE_PRODUCT');
        }}>
        {isZzimed ? (
          <RedSole className={cx('redSoleImg')} viewBox="0 0 35 35" />
        ) : color === 'white' ? (
          <Sole className={cx('soleImg')} viewBox="0 0 35 35" />
        ) : (
          <GraySole className={cx('soleImg')} viewBox="0 0 35 35" />
        )}
      </button>
      <BottomModal isOpen={modalOpen} onClose={handleModalClose}>
        <div className={cx('modalContents')}>
          <p className={cx('modalTitle')}>
            로그인이 필요합니다.
            <br />
            로그인 페이지로 이동하시겠습니까?
          </p>
          <div className={cx('modalButtons')}>
            <Button size="medium" backgroundColor="$color-white" onClick={handleModalClose}>
              취소
            </Button>
            <Button size="medium" backgroundColor="$color-gray-800" onClick={handleLoginButtonClick}>
              확인
            </Button>
          </div>
        </div>
      </BottomModal>
    </>
  );
}

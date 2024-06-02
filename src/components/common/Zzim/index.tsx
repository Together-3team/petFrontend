import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getLikeStatus, likeProduct, unlikeProduct } from '@/utils/zzim';
import Sole from '@/assets/svgs/sole.svg';
import RedSole from '@/assets/svgs/sole-red.svg';
import GraySole from '@/assets/svgs/sole-gray.svg';
import styles from './Zzim.module.scss';

interface Zzim {
  className?: string;
  color: 'gray' | 'white';
  userId: number;
  productId: number;
}

interface ProductUserInfo {
  productId: number;
  userId: number;
  userAction: 'LIKE_PRODUCT' | 'UNLIKE_PRODUCT';
}

const cx = classNames.bind(styles);

//className에서 zzim 위치 조정
export default function Zzim({ className, color, userId, productId }: Zzim) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: isProductLikedByCurrentUser } = useQuery({
    queryKey: ['likeStatus', productId, userId],
    queryFn: () => getLikeStatus(productId, userId),
    enabled: !!userId,
  });

  const likesMutation = useMutation({
    mutationFn: async ({ productId, userId, userAction }: ProductUserInfo) => {
      if (userAction === 'LIKE_PRODUCT') {
        await likeProduct(productId, userId);
      } else {
        await unlikeProduct(productId, userId);
      }
    },
    onMutate: async ({ productId, userId, userAction }) => {
      await queryClient.cancelQueries({ queryKey: ['likeStatus', productId, userId] });
      await queryClient.cancelQueries({ queryKey: ['likeCount', productId] });

      const prevLikeStatus = queryClient.getQueryData(['likeStatus', productId, userId]);

      queryClient.setQueryData(['likeStatus', productId, userId], () => userAction === 'LIKE_PRODUCT');

      return { prevLikeStatus };
    },
    onError: (err, { productId, userId }, context) => {
      queryClient.setQueryData(['likeStatus', productId, userId], context?.prevLikeStatus);
    },
    onSettled: (data, err, { productId, userId }) => {
      queryClient.invalidateQueries({
        queryKey: ['likeStatus', productId, userId],
      });
    },
  });

  const handleZzimButtonClick = (userAction: 'UNLIKE_PRODUCT' | 'LIKE_PRODUCT') => {
    //로그인이 되어 있지 않으면 현재 페이지의 url을 가지고 로그인 페이지로 이동한다.
    if (!userId) router.push(`/login?redirect=${router.asPath}`);
    likesMutation.mutate({
      productId: productId,
      userId: userId,
      userAction,
    });
  };

  return (
    <button
      type="button"
      className={cx('zzimButton', className)}
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        handleZzimButtonClick(isProductLikedByCurrentUser ? 'UNLIKE_PRODUCT' : 'LIKE_PRODUCT');
      }}>
      {isProductLikedByCurrentUser ? (
        <RedSole className={cx('redSoleImg')} viewBox="0 0 35 35" />
      ) : color === 'white' ? (
        <Sole className={cx('soleImg')} viewBox="0 0 35 35" />
      ) : (
        <GraySole className={cx('soleImg')} viewBox="0 0 35 35" />
      )}
    </button>
  );
}

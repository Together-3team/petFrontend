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
  productId: number;
}

interface ProductUserInfo {
  productId: number;
  userAction: 'LIKE_PRODUCT' | 'UNLIKE_PRODUCT';
}

const cx = classNames.bind(styles);

//className에서 zzim 위치 조정
export default function Zzim({ className, color, productId }: Zzim) {
  const queryClient = useQueryClient();

  const { data: isProductLikedByCurrentUser } = useQuery({
    queryKey: ['likeStatus', productId],
    queryFn: () => getLikeStatus(productId),
  });

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
      await queryClient.cancelQueries({ queryKey: ['likeCount', productId] });

      const prevLikeStatus = queryClient.getQueryData(['likeStatus', productId]);

      queryClient.setQueryData(['likeStatus', productId], () => userAction === 'LIKE_PRODUCT');

      return { prevLikeStatus };
    },
    onError: (err, { productId }, context) => {
      queryClient.setQueryData(['likeStatus', productId], context?.prevLikeStatus);
    },
    onSettled: (data, err, { productId }) => {
      queryClient.invalidateQueries({
        queryKey: ['likeStatus', productId],
      });
    },
  });

  const handleZzimButtonClick = (userAction: 'UNLIKE_PRODUCT' | 'LIKE_PRODUCT') => {
    likesMutation.mutate({
      productId: productId,
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

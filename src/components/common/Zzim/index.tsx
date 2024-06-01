import { MouseEvent, useState } from 'react';
import classNames from 'classnames/bind';

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

const cx = classNames.bind(styles);

//className에서 zzim 위치 조정
export default function Zzim({ className, color, userId, productId }: Zzim) {
  const [isProductLikedByCurrentUser, setIsProductLikedByCurrentUser] = useState(true);

  const handleZzimClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsProductLikedByCurrentUser(!isProductLikedByCurrentUser);
  };
  return (
    <button type="button" className={cx('zzimButton', className)} onClick={handleZzimClick}>
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

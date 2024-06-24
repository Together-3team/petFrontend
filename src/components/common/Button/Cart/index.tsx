import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './CartButton.module.scss';
import CartIcon from '@/assets/svgs/cart.svg';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { cartQueries } from '@/apis/cart/queries';
import { useEffect } from 'react';

interface CartButtonProps {
  className?: string;
}

const cx = classNames.bind(styles);

export default function CartButton({ className }: CartButtonProps) {
  const router = useRouter();
  const { isLogin } = useAuth();
  const { data: cart } = useQuery({
    ...cartQueries.queryOptions(),
    enabled: isLogin,
  });

  const cartCount = cart?.length || 0;

  const handleClick = () => {
    cartQueries.invalidateQueries();
    router.push('/cart');
  };

  useEffect(() => {
    if (!isLogin) {
      cartQueries.removeQueries();
    }
  }, [isLogin]);

  return (
    <button type="button" className={cx('container', className)} onClick={handleClick}>
      <span className={styles.count}>{cartCount}</span>
      <CartIcon />
    </button>
  );
}

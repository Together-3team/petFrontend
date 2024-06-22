import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './CartButton.module.scss';
import CartIcon from '@/assets/svgs/cart.svg';
import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import { cartQueries } from '@/apis/cart/queries';
import { useEffect } from 'react';

interface CartButtonProps extends Partial<LinkProps> {
  className?: string;
}

const cx = classNames.bind(styles);

export default function CartButton({ className, ...rest }: CartButtonProps) {
  const router = useRouter();
  const { isLogin } = useAuth();
  const { data: cart } = useQuery({
    ...cartQueries.queryOptions(),
    enabled: isLogin,
  });

  const cartCount = cart?.length || 0;

  useEffect(() => {
    if (!isLogin) {
      cartQueries.removeQueries();
    }
  }, [isLogin]);

  return (
    <Link
      href={{
        pathname: '/cart',
        query: {
          prevPath: router.asPath,
        },
      }}
      as="/cart"
      className={cx('container', className)}
      {...rest}>
      <span className={styles.count}>{cartCount}</span>
      <CartIcon />
    </Link>
  );
}

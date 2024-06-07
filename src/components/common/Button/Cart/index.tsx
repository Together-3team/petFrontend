import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './CartButton.module.scss';
import CartIcon from '@/assets/svgs/cart.svg';

interface CartButtonProps extends Partial<LinkProps> {
  className?: string;
}

const cx = classNames.bind(styles);

export default function CartButton({ className, ...rest }: CartButtonProps) {
  const count = 1; // 리액트 쿼리로 변경 예정

  const router = useRouter();

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
      <span className={styles.count}>{count}</span>
      <CartIcon />
    </Link>
  );
}

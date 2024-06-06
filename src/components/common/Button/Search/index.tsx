import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

import styles from './SearchButton.module.scss';
import SearchIcon from '@/assets/svgs/search.svg';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

export default function SearchButton({ className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const router = useRouter();

  return (
    <Link
      href={{
        pathname: '/search',
        query: {
          prevPath: router.asPath,
        },
      }}
      as="/search"
      className={cx('container', className)}
      {...rest}>
      <SearchIcon />
    </Link>
  );
}

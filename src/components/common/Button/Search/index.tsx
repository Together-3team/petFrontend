import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';

import styles from './SearchButton.module.scss';
import SearchIcon from '@/assets/svgs/search.svg';

interface SearchButtonProps extends Partial<LinkProps> {
  className?: string;
}

const cx = classNames.bind(styles);

export default function SearchButton({ className, ...rest }: SearchButtonProps) {
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

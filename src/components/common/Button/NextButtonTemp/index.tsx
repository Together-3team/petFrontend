import Link, { LinkProps } from 'next/link';
import classNames from 'classnames/bind';

import styles from './NextButtonTemp.module.scss';
import RightArrowIcon from '@/assets/svgs/right-arrow-bold.svg';

const cx = classNames.bind(styles);

interface NextButtonTempProps extends LinkProps {
  className?: string;
}

export default function NextButtonTemp({ className, ...rest }: NextButtonTempProps) {
  return (
    <Link className={cx('button', className)} {...rest}>
      <RightArrowIcon />
    </Link>
  );
}

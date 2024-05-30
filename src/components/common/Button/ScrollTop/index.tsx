import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames/bind';

import styles from './ScrollTopButton.module.scss';

const cx = classNames.bind(styles);

interface ScrollTopButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function ScrollTopButton({ className, children, ...rest }: PropsWithChildren<ScrollTopButtonProps>) {
  return (
    <button type="button" className={cx('button', className)} {...rest}>
      {children}
    </button>
  );
}

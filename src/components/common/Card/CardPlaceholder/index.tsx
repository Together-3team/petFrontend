import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardPlaceholder.module.scss';

interface CardViewAllProps extends ComponentPropsWithoutRef<'div'> {}

const cx = classNames.bind(styles);

export default function CardPlaceholder({ className, children, ...rest }: CardViewAllProps) {
  return (
    <div className={cx('container', className)} {...rest}>
      {children}
    </div>
  );
}

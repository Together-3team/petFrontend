import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderHeader.module.scss';

const cx = classNames.bind(styles);

interface CardSliderHeaderProps extends ComponentPropsWithoutRef<'header'> {}

export default function CardSliderHeader({ className, children, ...rest }: CardSliderHeaderProps) {
  return (
    <header className={cx('header', className)} {...rest}>
      {children}
    </header>
  );
}

import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderTitle.module.scss';

const cx = classNames.bind(styles);

interface CardSliderTitleProps extends ComponentPropsWithoutRef<'p'> {}

export default function CardSliderTitle({ className, children, ...rest }: CardSliderTitleProps) {
  return (
    <p className={cx('title', className)} {...rest}>
      {children}
    </p>
  );
}

import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderDescription.module.scss';

const cx = classNames.bind(styles);

interface CardSliderDescriptionProps extends ComponentPropsWithoutRef<'p'> {}

export default function CardSliderDescription({ className, children, ...rest }: CardSliderDescriptionProps) {
  return (
    <p className={cx('description', className)} {...rest}>
      {children}
    </p>
  );
}

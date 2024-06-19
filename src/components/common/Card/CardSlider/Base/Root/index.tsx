import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderRoot.module.scss';

const cx = classNames.bind(styles);

interface CardSliderRootProps extends ComponentPropsWithoutRef<'div'> {}

export default function CardSliderRoot({ className, children, ...rest }: CardSliderRootProps) {
  return (
    <div className={cx('container', className)} {...rest}>
      {children}
    </div>
  );
}

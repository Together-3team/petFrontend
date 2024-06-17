import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderItem.module.scss';

const cx = classNames.bind(styles);

interface CardSliderItemProps extends ComponentPropsWithoutRef<'li'> {}

export default function CardSliderItem({ className, children, ...rest }: CardSliderItemProps) {
  return (
    <li className={cx('item', className)} {...rest}>
      {children}
    </li>
  );
}

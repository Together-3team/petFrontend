import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './CardSliderList.module.scss';
import useDragScroll from '@/hooks/useDragScroll';

const cx = classNames.bind(styles);

interface CardSliderListProps extends ComponentPropsWithoutRef<'ul'> {}

export default function CardSliderList({ className, children, ...rest }: CardSliderListProps) {
  const dragScrollProps = useDragScroll<HTMLDivElement>();

  return (
    <div className={styles.container} {...dragScrollProps}>
      <ul className={cx('list', className)} {...rest}>
        {children}
      </ul>
    </div>
  );
}

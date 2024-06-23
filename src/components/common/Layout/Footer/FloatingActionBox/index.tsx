import { ComponentPropsWithoutRef } from 'react';
import classNames from 'classnames/bind';

import styles from './FloatingActionBox.module.scss';

const cx = classNames.bind(styles);

interface FloatingActionBoxProps extends ComponentPropsWithoutRef<'div'> {}

/*
  FloatingBox와 함께 사용하시면 ScrollTopButton과 같은 항상 떠있는 액션 버튼을 구현하실 수 있습니다.

  사용⭐️)
  export default function Example() {
    return (
      <FloatingBox>
        <FloatingActionBox>
          <ScrollTopButton />
        </FloatingActionBox>
      </FloatingBox>
    )
  }
*/
export default function FloatingActionBox({ children, className, ...rest }: FloatingActionBoxProps) {
  return (
    <div className={cx('container', className)} {...rest}>
      {children}
    </div>
  );
}

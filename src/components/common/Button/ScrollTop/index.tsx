import classNames from 'classnames/bind';

import styles from './ScrollTopButton.module.scss';
import ArrowTop from '@/assets/svgs/arrow-top-white.svg';
import useScrollUpAndDown from '@/hooks/useScrollUpAndDown';

const cx = classNames.bind(styles);

interface ScrollTopButtonProps {
  className?: string;
  minHeight?: number;
}

export default function ScrollTopButton({ className, minHeight = 200 }: ScrollTopButtonProps) {
  const { isUp } = useScrollUpAndDown(minHeight);

  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {!isUp && (
        <button type="button" className={cx('button', className)} onClick={handleClick}>
          <ArrowTop />
        </button>
      )}
    </>
  );
}

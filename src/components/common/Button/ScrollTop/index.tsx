import classNames from 'classnames/bind';

import styles from './ScrollTopButton.module.scss';
import ArrowTop from '@/assets/svgs/arrow-top-white.svg';
import useTargetHeightShow from '@/hooks/useTargetHeightShow';

const cx = classNames.bind(styles);

interface ScrollTopButtonProps {
  className?: string;
  minHeight?: number;
}

export default function ScrollTopButton({ className, minHeight }: ScrollTopButtonProps) {
  const { isShow } = useTargetHeightShow(minHeight);

  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isShow && (
        <button type="button" className={cx('button', className)} onClick={handleClick}>
          <ArrowTop />
        </button>
      )}
    </>
  );
}

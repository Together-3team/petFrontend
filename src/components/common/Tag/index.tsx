import Image from 'next/image';
import classNames from 'classnames/bind';

import Stock from '@/assets/svgs/stock.svg';
import ThumbsUp from '@/assets/svgs/thumbs-up.svg';
import styles from './Tag.module.scss';

type TagProps = {
  children: React.ReactNode;
  color?: string;
  size: 'small' | 'medium' | 'big';
  type?: 'stock' | 'thumbsUp';
  className?: string;
};

const cx = classNames.bind(styles);

function Tag({ children, color, size, type, className }: TagProps) {
  return (
    <div
      className={cx('tag', className)}
      data-size={size}
      data-type={type}
      style={{
        background: `${color}`,
      }}>
      {type === 'stock' && (
        <Stock alt={type} width={size === 'big' ? 8 : 6} height={size === 'big' ? 8 : 6} viewBox="0 0 12 12" />
      )}
      {type === 'thumbsUp' && (
        <ThumbsUp alt={type} width={size === 'big' ? 8 : 6} height={size === 'big' ? 8 : 6} viewBox="0 0 10 10" />
      )}
      {children}
    </div>
  );
}

export default Tag;

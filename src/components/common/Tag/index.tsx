import Image from 'next/image';
import classNames from 'classnames/bind';

import Stock from '@/assets/svgs/stock.svg';
import ThumbsUp from '@/assets/svgs/thumbs-up.svg';
import styles from './Tag.module.scss';

type TagProps = {
  children: React.ReactNode;
  color?: string;
  size: 'small' | 'big';
  type?: 'stock' | 'thumbsUp';
};

const cx = classNames.bind(styles);

function Tag({ children, color, size, type }: TagProps) {
  return (
    <div
      className={cx('tag')}
      data-status="item"
      style={{
        background: `${color}`,
        color: type === 'stock' ? '#FE5A65' : '#34BACC',
        fontSize: size === 'big' ? '10px' : '8px',
        padding: size === 'big' ? '3.5px 5px' : '3.5px',
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

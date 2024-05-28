import Image from 'next/image';
import styles from './Tag.module.scss';
import Stock from '@/assets/svgs/stock.svg';
import ThumbsUp from '@/assets/svgs/thumbs-up.svg';

type TagProps = {
  children: React.ReactNode;
  color?: string;
  size: 'small' | 'big';
  type?: 'stock' | 'thumbsUp';
};

function Tag({ children, color, size, type }: TagProps) {
  return (
    <div
      className={styles.tag}
      data-status="item"
      style={{
        background: `${color}`,
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

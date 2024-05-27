import Image from 'next/image';
import styles from './Tag.module.scss';
import stock from '@/assets/svgs/stock.svg';
import thumbsUp from '@/assets/svgs/thumbs-up.svg';

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
      style={{ background: `${color}`, fontSize: size === 'big' ? '10px' : '8px' }}>
      {type && (
        <Image
          src={type === 'stock' ? stock : thumbsUp}
          alt={type}
          width={size === 'big' ? 8 : 6}
          height={size === 'big' ? 8 : 6}
        />
      )}
      {children}
    </div>
  );
}

export default Tag;

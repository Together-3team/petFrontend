import styles from './Tag.module.scss';

type TagProps = {
  children: React.ReactNode;
  color?: string;
  size: 'small' | 'big';
};

function Tag({ children, color, size }: TagProps) {
  return (
    <div
      className={styles.tag}
      data-status="item"
      style={{ background: `${color}`, fontSize: size === 'big' ? '10px' : '8px' }}>
      {children}
    </div>
  );
}

export default Tag;

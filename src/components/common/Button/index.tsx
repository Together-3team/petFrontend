import styles from './Button.module.scss';

interface ButtonProps {
  size: 'large' | 'medium';
  children?: React.ReactNode;
  backgroundColor: '#545454' | '#FFFFFF';
  onClick?: () => void;
}

export default function Button({ size, children, backgroundColor, onClick }: ButtonProps) {
  const sizeClass = styles[size];
  const backgroundClass = backgroundColor === '#545454' ? styles.backgroundBlack : styles.backgroundWhite;
  const className = `${styles.button} ${sizeClass} ${backgroundClass}`;

  return (
    <>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

import styles from './Button.module.scss';

interface ButtonProps {
  size: 'large' | 'mediumLarge' | 'medium';
  children?: React.ReactNode;
  backgroundColor: '$color-gray-800' | '$color-gray-300' | '$color-pink-main' | '$color-white';
  onClick?: () => void;
}

export default function Button({ size, children, backgroundColor, onClick }: ButtonProps) {
  const sizeClass = styles[size];
  const backgroundColorMap: { [key: string]: string } = {
    '$color-gray-800': styles.backgroundBlack,
    '$color-gray-300': styles.backgroundGray,
    '$color-pink-main': styles.backgroundPink,
    '$color-white': styles.backgroundWhite,
  };
  const backgroundClass = backgroundColorMap[backgroundColor] || '';
  const className = `${styles.button} ${sizeClass} ${backgroundClass}`;

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={className} onClick={onClick}>
          {children}
        </button>
      </div>
    </>
  );
}

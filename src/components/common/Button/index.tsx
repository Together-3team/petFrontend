import styles from './Button.module.scss';

interface ButtonProps {
  size: 'large' | 'medium';
  children?: React.ReactNode;
  backgroundColor: '$color-gray-800' | '$color-gray-300' | '$color-pink-main' | '$color-white';
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ size, children, backgroundColor, onClick, disabled }: ButtonProps) {
  const sizeClass = styles[size];
  const backgroundColorMap: { [key: string]: string } = {
    '$color-gray-800': styles.backgroundBlack,
    '$color-gray-300': styles.backgroundGray,
    '$color-pink-main': styles.backgroundPink,
    '$color-white': styles.backgroundWhite,
  };
  const backgroundClass = backgroundColorMap[backgroundColor] || '';
  const disabledClass = disabled ? styles.disabled : '';
  const className = `${styles.button} ${sizeClass} ${backgroundClass} ${disabledClass}`;

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={className} onClick={onClick} disabled={disabled}>
          {children}
        </button>
      </div>
    </>
  );
}

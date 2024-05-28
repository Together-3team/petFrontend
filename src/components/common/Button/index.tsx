import styles from './Button.module.scss';

interface ButtonProps {
  size: 'large' | 'medium';
  children?: React.ReactNode;
  backgroundColor: '#373C49' | '#cfd3db' | '#fe5a65' | '#ffffff';
  onClick?: () => void;
}

export default function Button({ size, children, backgroundColor, onClick }: ButtonProps) {
  const sizeClass = styles[size];
  const backgroundColorMap: { [key: string]: string } = {
    '#373C49': styles.backgroundBlack,
    '#cfd3db': styles.backgroundGray,
    '#fe5a65': styles.backgroundPink,
    '#ffffff': styles.backgroundWhite,
  };
  const backgroundClass = backgroundColorMap[backgroundColor] || '';
  const className = `${styles.button} ${sizeClass} ${backgroundClass}`;

  return (
    <>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

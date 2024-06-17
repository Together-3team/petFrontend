import styles from './LogoFull.module.scss';

import LogoIcon from '@/assets/svgs/logo.svg';
import LogoTextIcon from '@/assets/svgs/pawing-market.svg';

export default function LogoFull() {
  return (
    <span className={styles.container}>
      <LogoIcon />
      <LogoTextIcon />
    </span>
  );
}

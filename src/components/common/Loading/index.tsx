import Lottie from 'react-lottie-player';

import styles from './Loading.module.scss';
import pawingLoading from '@/assets/lotties/pawing-loading.json';

export default function Loading() {
  return (
    <div className={styles.layout}>
      <Lottie className={styles.lottie} animationData={pawingLoading} play />
      <p className={styles.text}>loading...</p>
    </div>
  );
}

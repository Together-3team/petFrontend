import Link from 'next/link';

import styles from './NotFound.module.scss';
import WarningPawingIcon from '@/assets/svgs/warning-pawing.svg';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <WarningPawingIcon />
      <p className={styles.title}>페이지를 찾을 수 없습니다.</p>
      <div className={styles.description}>
        <p>페이지의 주소가 잘못 입력되었거나,</p>
        <p>주소가 변경 혹은 삭제되어 사용하실 수 없습니다.</p>
      </div>
      <Link href="/" className={styles.link}>
        홈으로
      </Link>
    </div>
  );
}

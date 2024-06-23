import { useRouter } from 'next/router';
import WarningPawingIcon from '@/assets/svgs/warning-pawing.svg';
import styles from './NoAccess.module.scss';

export default function NoAccess() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <WarningPawingIcon />
      <p className={styles.title}>권한이 없습니다.</p>
      <div className={styles.description}>
        <p>페이지 접근 권한이 없어 접속할 수 없습니다.</p>
      </div>
      <button className={styles.link} onClick={handleBack}>
        돌아가기
      </button>
    </div>
  );
}

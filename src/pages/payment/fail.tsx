import Image from 'next/image';
import fail from '@/assets/images/fail.png';
import styles from './Fail.module.scss';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

export default function Fail() {
  const router = useRouter();

  return (
    <div className={styles.fail}>
      <Image className={styles.petImg} src={fail} alt="fail" />
      <div className={styles.failTitle}>결제 실패</div>
      <div className={styles.failExplain}>결제가 완료되지 않았습니다. 다시 한 번 시도해 주세요.</div>
      <Button size="small" backgroundColor="$color-gray-800" onClick={() => router.back()}>
        돌아가기
      </Button>
    </div>
  );
}

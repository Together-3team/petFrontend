import { useRouter } from 'next/router';
import LeftArrow from '@/assets/svgs/left-arrow.svg';
import styles from './BackButtonTemp.module.scss';

interface BackButtonTemp {
  href?: string;
  hasPrevPath?: boolean;
}

export default function BackButtonTemp({ href, hasPrevPath = true }: BackButtonTemp) {
  const router = useRouter();
  const prevPath = router.query?.prevPath;

  function handleClick() {
    if (hasPrevPath && prevPath) {
      router.replace(Array.isArray(prevPath) ? prevPath[0] : prevPath);
      return;
    }

    if (href) {
      router.replace(href);
      return;
    }

    router.back();
  }

  return (
    <button className={styles.backButton} onClick={handleClick}>
      <LeftArrow width={24} height={24} alt="뒤로 가기 버튼" />
    </button>
  );
}

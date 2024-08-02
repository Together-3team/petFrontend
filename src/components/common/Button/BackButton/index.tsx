import { useRouter } from 'next/router';
import LeftArrow from '@/assets/svgs/left-arrow.svg';
import styles from './BackButton.module.scss';

interface BackButton {
  href?: string;
  hasPrevPath?: boolean;
}

export default function BackButton({ href, hasPrevPath = true }: BackButton) {
  const router = useRouter();
  const prevPath = router.query?.prevPath;

  function handleClick() {
    if (hasPrevPath && prevPath) {
      router.push(Array.isArray(prevPath) ? prevPath[0] : prevPath);
      return;
    }

    if (href) {
      router.push(href);
      return;
    }

    router.back();
  }

  return (
    <button className={styles.backButton} onClick={handleClick} aria-label="뒤로 가기 버튼">
      <LeftArrow width={24} height={24} />
    </button>
  );
}

{
  /* 사용법
1. 특정 링크로 이동
<BackButton href=""/>
2. 이전 페이지로 이동
<BackButton />
*/
}

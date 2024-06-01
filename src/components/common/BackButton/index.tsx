import { useRouter } from 'next/router';
import LeftArrow from '@/assets/svgs/left-arrow.svg';
import styles from './BackButton.module.scss';

interface BackButton {
  href?: string;
}

export default function BackButton({ href }: BackButton) {
  const router = useRouter();

  function handleClick() {
    if (href) {
      router.push(href);
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

{
  /* 사용법
1. 특정 링크로 이동
<BackButton href=""/>
2. 이전 페이지로 이동
<BackButton />
*/
}

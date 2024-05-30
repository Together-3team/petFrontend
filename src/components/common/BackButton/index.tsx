import { useRouter } from 'next/router';
import LeftArrow from '@/assets/svgs/left-arrow.svg';

interface BackButton {
  href?: string;
}

export default function BackButton({ href }: BackButton) {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  function handleClick() {
    href && router.push(href);
  }

  return <LeftArrow width={24} height={24} onClick={href ? handleClick : handleBack} alt="뒤로 가기 버튼" />;
}

{
  /* 사용법
1. 특정 링크로 이동
<BackButton href=""/>
2. 이전 페이지로 이동
<BackButton />
*/
}

import { useRouter } from 'next/router';
import ImageBox from '@/components/common/ImageBox';
import Image from '@/assets/exampleProductImg.jpg';
import styles from './Onboarding.module.scss';
//TODO: API 연결 후 welcome 페이지, signup 페이지 통합 후 경로 정리
export default function Welcome() {
  const router = useRouter();
  const nextPage = (router.query.path as string) || '/';
  setTimeout(() => {
    router.push(nextPage);
  }, 2000);

  return (
    <div className={styles.welcomeLayout}>
      <h1 className={styles.welcomeTitle}>환영합니다, 해피사랑님!</h1>
      <ImageBox size="welcomePetPhoto" src={Image} alt="환영 이미지" />
    </div>
  );
}

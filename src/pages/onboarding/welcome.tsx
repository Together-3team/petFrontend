import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import ImageBox from '@/components/common/ImageBox';
import Image from '@/assets/exampleProductImg.jpg';
import styles from './Welcome.module.scss';

export default function Welcome() {
  const { userData } = useAuth();
  console.log(userData);

  const router = useRouter();
  const nextPage = (router.query.path as string) || '/';
  setTimeout(() => {
    router.push(nextPage);
  }, 2000);

  return (
    <div className={styles.welcomeLayout}>
      <h1 className={styles.welcomeTitle}>환영합니다, {userData.nickname}님!</h1>
      <ImageBox size="welcomePetPhoto" src={Image} alt="환영 이미지" />
    </div>
  );
}

import ImageBox from '@/components/common/ImageBox';
import Image from '@/assets/exampleProductImg.jpg';
import styles from './Onboarding.module.scss';

export default function Welcome() {
  return (
    <div className={styles.welcomePage}>
      <h1 className={styles.welcomeTitle}>환영합니다, 해피사랑님!</h1>
      <ImageBox size="welcomePetPhoto" src={Image} alt="환영 이미지" />
    </div>
  );
}

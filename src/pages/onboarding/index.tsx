import Link from 'next/link';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import Image from '@/assets/exampleProductImg.jpg';
import styles from './Onboarding.module.scss';

export default function Onboarding() {
  //TODO: CheckOnly 컴포넌트 넣기
  return (
    <div className={styles.onboarding}>
      <h1 className={styles.petChoiceText}>
        어서오세요!
        <br />
        어떤 반려동물과 함께하시나요?
      </h1>
      <div className={styles.petChoice}>
        <div className={styles.petChoiceBox}>
          <ImageBox size="petPhoto" src={Image} alt="강아지 이미지" />
          <label>
            <input type="checkbox" className={styles.checkboxInput} />
            <div className={styles.petChoiceButton}>강아지</div>
          </label>
        </div>
        <div className={styles.petChoiceBox}>
          <ImageBox size="petPhoto" src={Image} alt="고양이 이미지" />
          <label>
            <input type="checkbox" className={styles.checkboxInput} />
            <div className={styles.petChoiceButton}>고양이</div>
          </label>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Link href="/onboarding/welcome">
          <Button size="mediumLarge" backgroundColor="$color-pink-main">
            다음
          </Button>
        </Link>
        <Link href="/">
          <div className={styles.laterChoice}>나중에 선택할게요</div>
        </Link>
      </div>
    </div>
  );
}

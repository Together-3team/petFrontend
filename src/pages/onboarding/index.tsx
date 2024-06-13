import Link from 'next/link';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import Image from '@/assets/exampleProductImg.jpg';
import styles from './Onboarding.module.scss';

export default function Onboarding() {
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.onboardingLayout}>
          <h1 className={styles.petChoiceText}>
            어서오세요!
            <br />
            어떤 반려동물과 함께하시나요?
          </h1>
          <div className={styles.petChoice}>
            <div className={styles.petChoiceBox}>
              <ImageBox size="petPhoto" src={Image} alt="강아지 이미지" />
              <label className={styles.petChoiceLabel}>
                <input type="checkbox" className={styles.checkboxInput} {...register('dog')} />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>강아지</span>
                  <div className={styles.checkIcon} />
                </div>
              </label>
            </div>
            <div className={styles.petChoiceBox}>
              <ImageBox size="petPhoto" src={Image} alt="고양이 이미지" />
              <label className={styles.petChoiceLabel}>
                <input type="checkbox" className={styles.checkboxInput} {...register('cat')} />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>고양이</span>
                  <div className={styles.checkIcon} />
                </div>
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
      </form>
    </FormProvider>
  );
}

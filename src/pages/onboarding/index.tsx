import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import selectedDog from '@/assets/images/selected-dog.png';
import selectedCat from '@/assets/images/selected-cat.png';
import unselectedCat from '@/assets/images/unselected-cat.png';
import unselectedDog from '@/assets/images/unselected-dog.png';

import styles from './Onboarding.module.scss';

export default function Onboarding() {
  const [isChecked, setIsChecked] = useState<string | null>();
  const methods = useForm();
  const { register, handleSubmit } = methods;
  const onSubmit: SubmitHandler<FieldValues> = data => console.log(data);

  function handleCheckboxChange(key: string) {
    setIsChecked(prev => (prev === key ? null : key));
  }

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
              <ImageBox
                size="petPhoto"
                src={isChecked === 'dog' ? selectedDog : unselectedDog}
                alt={isChecked === 'cat' ? '선택된 강아지 이미지' : '미선택 강아지 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  key="dog"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked === 'dog'}
                  onClick={() => handleCheckboxChange('dog')}
                  {...register('dog')}
                />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>강아지</span>
                  <div className={styles.checkIcon} />
                </div>
              </label>
            </div>
            <div className={styles.petChoiceBox}>
              <ImageBox
                size="petPhoto"
                src={isChecked === 'cat' ? selectedCat : unselectedCat}
                alt={isChecked === 'cat' ? '선택된 고양이 이미지' : '미선택 고양이 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  key="cat"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked === 'cat'}
                  onClick={() => handleCheckboxChange('cat')}
                  {...register('cat')}
                />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>고양이</span>
                  <div className={styles.checkIcon} />
                </div>
              </label>
            </div>
          </div>
          <div className={styles.buttonArea}>
            <Link href="/onboarding/welcome">
              <Button size="mediumLarge" backgroundColor="$color-pink-main" disabled={!isChecked}>
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

import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UserEditParams, userApi } from '@/apis/userApi';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import selectedDog from '@/assets/images/selected-dog.png';
import selectedCat from '@/assets/images/selected-cat.png';
import unselectedCat from '@/assets/images/unselected-cat.png';
import unselectedDog from '@/assets/images/unselected-dog.png';
import { AxiosResponse } from 'axios';

import styles from './Onboarding.module.scss';
import useAuth from '@/hooks/useAuth';

export default function Onboarding() {
  const [isChecked, setIsChecked] = useState<number[]>([]);

  const { userData } = useAuth();

  const mutation = useMutation<AxiosResponse<any, any>, Error, UserEditParams>({
    mutationKey: ['userEdit'],
    // mutationFn: async ({ id, userData }: UserEditParams) => {
    //   return await userApi.put(id, userData);
    // },
    mutationFn: async ({ id, userData }: UserEditParams) => {
      const response = await userApi.put(id, userData);
      return response;
    },
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error('반려동물 선택 실패', error);
    },
  });

  type OnboardingProps = FieldValues & UserEditParams;

  const methods = useForm<OnboardingProps>();

  const { register, handleSubmit, setValue } = methods;
  const onSubmit: SubmitHandler<OnboardingProps> = data => {
    console.log(data);
    mutation.mutate(data);
  };

  function handleCheckboxChange(key: number) {
    setIsChecked(prev => (prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]));
    setValue(userData.prefferedPet, key);
  }

  function handleCheckAll(key: number) {
    setIsChecked([key]);
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
                src={isChecked.includes(1) ? selectedDog : unselectedDog}
                alt={isChecked.includes(1) ? '선택된 강아지 이미지' : '미선택 강아지 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  id="prefferedPet"
                  key="dog"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes(1)}
                  onClick={() => handleCheckboxChange(1)}
                  {...register('prefferedPet', { value: 1 })}
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
                src={isChecked.includes(2) ? selectedCat : unselectedCat}
                alt={isChecked.includes(2) ? '선택된 고양이 이미지' : '미선택 고양이 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  id="cat"
                  key="cat"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes(2)}
                  onClick={() => handleCheckboxChange(2)}
                  {...register('cat', { value: 2 })}
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
            <label>
              <input
                id="prefferedPet"
                key="all"
                className={styles.checkboxInput}
                type="checkbox"
                checked={isChecked.includes(0)}
                onClick={() => handleCheckAll(0)}
                {...register('prefferedPet', { value: 0 })}
              />
              <div className={styles.laterChoice}>나중에 선택할게요</div>
            </label>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

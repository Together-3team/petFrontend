import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { UserEditParams, userApi, UserId, UserEditProps } from '@/apis/userApi';
import useAuth from '@/hooks/useAuth';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import selectedDog from '@/assets/images/selected-dog.png';
import selectedCat from '@/assets/images/selected-cat.png';
import unselectedCat from '@/assets/images/unselected-cat.png';
import unselectedDog from '@/assets/images/unselected-dog.png';
import { AxiosResponse } from 'axios';

import styles from './Onboarding.module.scss';

export default function Onboarding() {
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const { userData } = useAuth();

  const queryClient = useQueryClient();
  const mutation = useMutation<AxiosResponse<any, any>, Error, UserEditParams>({
    mutationFn: async ({ id, userData }: UserEditParams) => {
      return await userApi.put(id, userData);
    },
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['userEdit'] });
    },
    onError: error => {
      console.error('반려동물 선택 실패', error);
    },
  });

  type OnboardingProps = FieldValues & UserEditParams;

  const methods = useForm();
  const { register, handleSubmit } = methods;
  const onSubmit: SubmitHandler<OnboardingProps> = data => {
    console.log(data), mutation.mutate(data);
  };

  function handleCheckboxChange(key: string) {
    setIsChecked(prev => (prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]));
  }

  function handleCheckNothing(key: string) {
    setIsChecked([key]);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
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
                src={isChecked.includes('dog') ? selectedDog : unselectedDog}
                alt={isChecked.includes('dog') ? '선택된 강아지 이미지' : '미선택 강아지 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  key="dog"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes('dog')}
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
                src={isChecked.includes('cat') ? selectedCat : unselectedCat}
                alt={isChecked.includes('cat') ? '선택된 고양이 이미지' : '미선택 고양이 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  key="cat"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes('cat')}
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
            <label>
              <input
                key="nothing"
                className={styles.checkboxInput}
                type="checkbox"
                onClick={() => handleCheckNothing('nothing')}
                {...register('nothing')}
              />
              <div className={styles.laterChoice}>나중에 선택할게요</div>
            </label>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { QueryClient, dehydrate, useMutation } from '@tanstack/react-query';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { UserEditParams, UserEditProps, fetchMyData, userApi } from '@/apis/userApi';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';
import selectedDog from '@/assets/images/selected-dog.png';
import selectedCat from '@/assets/images/selected-cat.png';
import unselectedCat from '@/assets/images/unselected-cat.png';
import unselectedDog from '@/assets/images/unselected-dog.png';
import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

import styles from './Onboarding.module.scss';
//TODO: 반려동물 선택 put 요청
export default function Onboarding() {
  const [isChecked, setIsChecked] = useState<number[]>([]);

  const { userData } = useAuth();

  const mutation = useMutation<AxiosResponse<UserEditParams>, Error, UserEditParams>({
    mutationKey: ['userEdit'],
    mutationFn: async ({ id, userEditData }: UserEditParams) => {
      const response = await userApi.put(id, userEditData);
      console.log(response);
      return response;
    },
    onSuccess: data => {
      console.log(data);
    },
    onError: error => {
      console.error('반려동물 선택 실패', error);
    },
  });

  interface PetValue {
    preferredPet: number;
  }

  const methods = useForm<PetValue>({
    defaultValues: {
      preferredPet: 0,
    },
  });

  const { register, handleSubmit, setValue } = methods;

  useEffect(() => {
    if (userData) {
      setValue('preferredPet', userData.preferredPet);
      setIsChecked([userData.preferredPet]);
    }
  }, [userData, setValue]);

  const onSubmit: SubmitHandler<PetValue> = data => {
    const userEditData: UserEditProps = {
      nickname: userData.nickname,
      phoneNumber: userData.phoneNumber,
      profileImage: userData.profileImage,
      isSubscribedToPromotions: userData.isSubscribedToPromotions,
      preferredPet: data.preferredPet,
    };
    console.log(data);

    const params: UserEditParams = {
      id: userData.id,
      userEditData,
    };
    mutation.mutate(params);
  };

  function handleCheckboxChange(key: number) {
    setIsChecked(prev => (prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]));
    setValue('preferredPet', key);
  }

  function handleCheckAll(key: number) {
    setIsChecked([key]);
    setValue('preferredPet', 0);
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
                  id="preferredPet"
                  key="dog"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes(1)}
                  onClick={() => handleCheckboxChange(1)}
                  {...register('preferredPet', { value: 1 })}
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
                  id="preferredPet"
                  key="cat"
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={isChecked.includes(2)}
                  onClick={() => handleCheckboxChange(2)}
                  {...register('preferredPet', { value: 2 })}
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
                id="preferredPet"
                key="all"
                className={styles.checkboxInput}
                type="checkbox"
                checked={isChecked.includes(0)}
                onClick={() => handleCheckAll(0)}
                {...register('preferredPet', { value: 0 })}
              />
              <div className={styles.laterChoice}>나중에 선택할게요</div>
            </label>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();

  const accessToken = context.req.cookies['accessToken'];

  await queryClient.prefetchQuery({ queryKey: ['user', accessToken], queryFn: fetchMyData });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

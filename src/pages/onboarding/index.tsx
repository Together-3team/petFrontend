import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { QueryClient, dehydrate, useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import { UserEditParams, UserEditProps, fetchMyData, userApi } from '@/apis/userApi';
import selectedDog from '@/assets/images/selected-dog.png';
import selectedCat from '@/assets/images/selected-cat.png';
import unselectedCat from '@/assets/images/unselected-cat.png';
import unselectedDog from '@/assets/images/unselected-dog.png';
import ImageBox from '@/components/common/ImageBox';
import Button from '@/components/common/Button';

import styles from './Onboarding.module.scss';

export default function Onboarding() {
  const { userData } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [dogChecked, setDogChecked] = useState(false);
  const [catChecked, setCatChecked] = useState(false);

  const mutation = useMutation({
    mutationKey: ['userEdit'],
    mutationFn: async ({ id, userEditData }: UserEditParams) => {
      const response = await userApi.put(id, userEditData);
      return response;
    },
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: error => {
      console.error('반려동물 선택 실패', error);
    },
  });

  const methods = useForm<FieldValues>();

  const { handleSubmit, register } = methods;

  const onSubmit: SubmitHandler<FieldValues> = data => {
    const preferredPet = data.cat === true && data.dog === false ? 2 : data.dog === true && data.cat === false ? 1 : 0;
    const userEditData: UserEditProps = {
      nickname: userData.nickname,
      phoneNumber: userData.phoneNumber,
      profileImage: userData.profileImage,
      isSubscribedToPromotions: userData.isSubscribedToPromotions,
      preferredPet: preferredPet,
    };

    const params: UserEditParams = {
      id: userData.id,
      userEditData,
    };

    mutation.mutate(params);
  };

  function handleDogCheckboxChange() {
    setDogChecked(prev => !prev);
  }

  function handleCatCheckboxChange() {
    setCatChecked(prev => !prev);
  }

  function handleMoveNext() {
    router.push('/onboarding/welcome');
  }

  function handleCheckNothing() {
    setCatChecked(false);
    setDogChecked(false);
    router.push('/onboarding/welcome');
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
                src={dogChecked ? selectedDog : unselectedDog}
                alt={dogChecked ? '선택된 강아지 이미지' : '미선택 강아지 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={dogChecked}
                  onClick={handleDogCheckboxChange}
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
                src={catChecked ? selectedCat : unselectedCat}
                alt={catChecked ? '선택된 고양이 이미지' : '미선택 고양이 이미지'}
              />
              <label className={styles.petChoiceLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={catChecked}
                  onClick={handleCatCheckboxChange}
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
            <Button
              type="submit"
              size="mediumLarge"
              onClick={handleMoveNext}
              backgroundColor="$color-pink-main"
              disabled={!dogChecked && !catChecked}>
              다음
            </Button>
            <label>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={!dogChecked && !catChecked}
                onClick={handleCheckNothing}
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

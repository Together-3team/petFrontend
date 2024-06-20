import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler, FormProvider, FieldValues, Controller } from 'react-hook-form';
import { QueryClient, dehydrate, useMutation } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import { UserEditParams, UserEditProps, fetchMyData, userApi } from '@/apis/userApi';
import Header from '@/components/common/Layout/Header';
import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import Input from '@/components/common/Input';
import BackButton from '@/components/common/Button/BackButton';
import Button from '@/components/common/Button';
import PlusButton from '@/assets/svgs/plus-button.svg';
import { nicknameSchema } from '@/utils/signupFormSchema';
import CheckNickname from '@/utils/checkNickname';

import styles from './Profile.module.scss';

export type ProfileValue = Yup.InferType<typeof nicknameSchema>;

export default function Profile() {
  const { userData } = useAuth();

  const [dogChecked, setDogChecked] = useState(userData.preferredPet === 1 || userData.preferredPet === 0);
  const [catChecked, setCatChecked] = useState(userData.preferredPet === 2 || userData.preferredPet === 0);

  const mutation = useMutation({
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
      console.error('회원 정보 수정 실패', error);
    },
  });

  const methods = useForm<ProfileValue & FieldValues>({
    resolver: yupResolver(nicknameSchema),
    mode: 'onBlur',
  });

  const {
    formState: { errors },
  } = methods;

  const { control, register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ProfileValue & FieldValues> = data => {
    const preferredPet = data.cat === true && data.dog === false ? 2 : data.dog === true && data.cat === false ? 1 : 0;
    const userEditData: UserEditProps = {
      nickname: data.nickname,
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
  //TODO: 이미지 삽입 구현
  function handleImageChange() {}

  return (
    <div className={styles.profileLayout}>
      <FormProvider {...methods}>
        <Header.Root>
          <Header.Box>
            <Header.Left>
              <BackButton />
            </Header.Left>
            <h1>프로필 수정</h1>
          </Header.Box>
        </Header.Root>
        <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <div className={styles.profileImageBox}>
              <div className={styles.profileImage}>
                <ProfileImgBadge size="large" profileImage={userData.profileImage} />
                <input type="file" onChange={handleImageChange} />
                <div className={styles.plusButton}>
                  <PlusButton />
                </div>
              </div>
            </div>
            <Controller
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="nickname"
                  type="text"
                  size="large"
                  label="닉네임"
                  isError={errors.nickname && true}
                  onBlur={async (e: ChangeEvent<HTMLInputElement>) => {
                    field.onBlur();
                    await CheckNickname(e);
                  }}
                  labelStyle={'label'}
                  defaultValue={userData.nickname}
                  placeholder="2~8자의 한글, 영어, 숫자를 입력해주세요"
                />
              )}
              {...register('nickname')}
            />
            {errors.nickname && <span className={styles.errorText}>{errors.nickname.message}</span>}
            <div className={styles.petChoiceLabel}>키우는 반려동물</div>
            <div className={styles.petChoice}>
              <label>
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
              <label>
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
          <Button type="submit" size="large" backgroundColor="$color-pink-main">
            저장
          </Button>
        </form>
      </FormProvider>
    </div>
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

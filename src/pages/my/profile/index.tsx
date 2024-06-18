import { useForm, SubmitHandler, FormProvider, FieldValues } from 'react-hook-form';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '@/hooks/useAuth';
import { fetchMyData } from '@/apis/userApi';
import Header from '@/components/common/Layout/Header';
import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import Input from '@/components/common/Input';
import BackButton from '@/components/common/Button/BackButton';
import Button from '@/components/common/Button';
import PlusButton from '@/assets/svgs/plus-button.svg';
import { nicknameSchema } from '@/utils/signupFormSchema';

import styles from './Profile.module.scss';

type profileValue = Yup.InferType<typeof nicknameSchema>;

export default function Profile() {
  const { userData } = useAuth();

  const methods = useForm<profileValue & FieldValues>({
    resolver: yupResolver(nicknameSchema),
  });
  const {
    formState: { errors },
  } = methods;
  const { register, handleSubmit } = methods;
  const onSubmit: SubmitHandler<profileValue & FieldValues> = data => console.log(data);
  console.log(errors);

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
                <div className={styles.plusButton}>
                  <PlusButton />
                </div>
              </div>
            </div>
            <Input
              id="nickname"
              type="text"
              size="large"
              label="닉네임"
              isError={errors.nickname && true}
              labelStyle={'label'}
              placeholder={userData.nickname}
              {...register('nickname')}
            />
            {errors.nickname && <span className={styles.errorText}>{errors.nickname.message}</span>}
            <div className={styles.petChoiceLabel}>키우는 반려동물</div>
            <div className={styles.petChoice}>
              <label>
                <input type="checkbox" className={styles.checkboxInput} {...register('dog')} />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>강아지</span>
                  <div className={styles.checkIcon} />
                </div>
              </label>
              <label>
                <input type="checkbox" className={styles.checkboxInput} {...register('cat')} />
                <div className={styles.petChoiceButton}>
                  <span className={styles.buttonText}>고양이</span>
                  <div className={styles.checkIcon} />
                </div>
              </label>
            </div>
          </div>
          <Button size="large" backgroundColor="$color-pink-main">
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

import { useState, useRef, ChangeEvent } from 'react';
import { useForm, SubmitHandler, FormProvider, FieldValues, Controller } from 'react-hook-form';
import { dehydrate, useQueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryClient } from '@/utils/queryClient';
import useAuth from '@/hooks/useAuth';
import CheckNickname from '@/utils/checkNickname';
import { myQueries, userQueries } from '@/apis/user/queries';
import { UserEditParams, UserEditProps } from '@/apis/user/api';
import { PostToGetPresignedUrlParams, postToGetPresignedUrl, putImageToUrl } from '@/apis/imageApi';
import Header from '@/components/common/Layout/Header';
import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import Input from '@/components/common/Input';
import BackButton from '@/components/common/Button/BackButton';
import Button from '@/components/common/Button';
import PlusButton from '@/assets/svgs/plus-button.svg';
import { nicknameSchema } from '@/utils/signupFormSchema';
import defaultImg from '@/assets/images/rectangle.png';

import styles from './Profile.module.scss';

export type ProfileValue = Yup.InferType<typeof nicknameSchema>;

export default function Profile() {
  const { userData } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(userData.profileImage || defaultImg);

  const [dogChecked, setDogChecked] = useState(userData.preferredPet === 1 || userData.preferredPet === 0);
  const [catChecked, setCatChecked] = useState(userData.preferredPet === 2 || userData.preferredPet === 0);

  const mutation = userQueries.useEditUserMutation(userData.id);

  const methods = useForm<ProfileValue & FieldValues>({
    resolver: yupResolver(nicknameSchema),
    mode: 'onBlur',
  });

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
      setValue('profileImage', file);
    }
  }

  const onSubmit: SubmitHandler<ProfileValue & FieldValues> = async data => {
    const preferredPet = data.cat === true && data.dog === false ? 2 : data.dog === true && data.cat === false ? 1 : 0;
    let newProfileImageUrl = userData.profileImage;

    if (profileImage) {
      const presignedUrlParams: PostToGetPresignedUrlParams = {
        items: [{ objectKey: profileImage.name, contentType: profileImage.type }],
        bucketName: 'review-image-3team',
      };

      try {
        const response = await postToGetPresignedUrl(presignedUrlParams);
        const presignedUrl = response.data.presignedUrl;
        const newFileName = response.data.presignedUrl[0].uniqueFileName;
        const newFile = new File([profileImage], newFileName, { type: profileImage.type });

        newProfileImageUrl = presignedUrl[0].url;

        await putImageToUrl({ image: newFile, url: newProfileImageUrl });
      } catch (error) {
        console.error('이미지 업로드 중 에러가 발생했습니다', error);
        return;
      }
    }

    const userEditData: UserEditProps = {
      nickname: data.nickname,
      phoneNumber: userData.phoneNumber,
      profileImage: newProfileImageUrl,
      isSubscribedToPromotions: userData.isSubscribedToPromotions,
      preferredPet: preferredPet,
    };

    const params: UserEditParams = {
      id: userData.id,
      userEditData,
    };

    mutation.mutate(params, {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: ['myData'],
        });
        router.push(
          {
            pathname: '/my',
            query: {
              status: 'success',
            },
          },
          '/my'
        );
      },
      onError: error => {
        console.error('회원 정보 수정 실패', error);
        router.push(
          {
            pathname: '/my',
            query: { status: 'error' },
          },
          '/my'
        );
      },
    });
  };

  function handleDogCheckboxChange() {
    setDogChecked(prev => !prev);
  }

  function handleCatCheckboxChange() {
    setCatChecked(prev => !prev);
  }

  function handleClickOpen() {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  }

  return (
    <div className={styles.profileLayout}>
      <FormProvider {...methods}>
        <Header.Root>
          <Header.Box>
            <Header.Left>
              <BackButton href="/my" />
            </Header.Left>
            <h1>프로필 수정</h1>
          </Header.Box>
        </Header.Root>
        <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formField}>
            <div className={styles.profileImageBox}>
              <div className={styles.profileImage} onClick={handleClickOpen}>
                <ProfileImgBadge
                  size="large"
                  profileImage={profileImageUrl ? profileImageUrl.split('?')[0] : userData.profileImage.split('?')[0]}
                />
                <input type="file" ref={hiddenInputRef} onChange={handleImageChange} />
                <button className={styles.plusButton} type="button">
                  <PlusButton />
                </button>
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
                  defaultValue={userData.nickname}
                  isError={errors.nickname && true}
                  onBlur={async (e: ChangeEvent<HTMLInputElement>) => {
                    field.onBlur();
                    await CheckNickname(e.target.value);
                  }}
                  labelStyle={'label'}
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
  const accessToken = context.req.cookies['accessToken'];

  await queryClient.prefetchQuery({ queryKey: ['myData', accessToken], queryFn: myQueries.queryOptions().queryFn });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

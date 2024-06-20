import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QueryClient, dehydrate, useMutation } from '@tanstack/react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCookies } from 'react-cookie';
import useModal from '@/hooks/useModal';
import useAuth from '@/hooks/useAuth';
import { DeleteUserRdo, UserEditParams, UserId, userApi, UserEditProps, fetchMyData } from '@/apis/userApi';
import Header from '@/components/common/Layout/Header';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/Button/BackButton';
import BottomModal from '@/components/common/Modal/Base/BottomModal';
import sadlyPet from '@/assets/images/sadly-pet.png';
import ImageBox from '@/components/common/ImageBox';
import { phoneNumberSchema } from '@/utils/signupFormSchema';
import { GetServerSidePropsContext } from 'next';

import styles from './Info.module.scss';

type PhoneNumberValue = Yup.InferType<typeof phoneNumberSchema>;

export default function Info() {
  const { userData } = useAuth();

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);

  const deleteUsermutation = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async (id: UserId) => {
      const response = await userApi.delete(id);
      return response.data;
    },
  });

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

  const methods = useForm<PhoneNumberValue>({
    resolver: yupResolver(phoneNumberSchema),
    mode: 'onBlur',
  });
  const {
    formState: { errors },
  } = methods;

  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<PhoneNumberValue> = data => {
    const userEditData: UserEditProps = {
      nickname: userData.nickname,
      phoneNumber: data.phoneNumber,
      profileImage: userData.profileImage,
      isSubscribedToPromotions: userData.isSubscribedToPromotions,
      preferredPet: userData.preferredPet,
    };
    console.log(data);

    const params: UserEditParams = {
      id: userData.id,
      userEditData,
    };

    mutation.mutate(params);
  };

  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  const router = useRouter();

  async function handleDeleteUser() {
    try {
      await deleteUsermutation.mutateAsync(userData.id);
      removeCookie('accessToken', { path: '/' });
      removeCookie('refreshToken', { path: '/' });
      router.push({
        pathname: '/',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return (
    <div className={styles.infoLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>회원 정보</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.infoField}>
        <form className={styles.memberForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputArea}>
            <Input
              id="email"
              type="email"
              size="large"
              label="이메일"
              labelStyle={'label'}
              readOnly
              background="background"
              placeholder={userData.email}
            />
            <Input
              id="phoneNumber"
              type="tel"
              size="large"
              label="연락처"
              isError={errors.phoneNumber && true}
              labelStyle={'label'}
              placeholder="000-0000-0000 형식으로 입력해주세요"
              defaultValue={userData.phoneNumber}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber.message}</span>}
          </div>
          <Button type="submit" size="large" backgroundColor="$color-pink-main">
            저장
          </Button>
        </form>
        <div className={styles.quitText} onClick={handleModalOpen}>
          회원탈퇴
        </div>
        <BottomModal isOpen={modalOpen} onClose={handleModalClose}>
          <div className={styles.modalSize}>
            <span className={styles.modalTitle}>정말로 탈퇴하시겠어요?</span>
            <ImageBox size="modalImage" src={sadlyPet} alt="강아지와 고양이가 울먹거리는 이미지" />
            <span className={styles.modalText}>
              • 찜한 상품들과 장바구니 상품들이 모두 사라져요
              <br />• 우리 아이와의 추억이 담긴 리뷰들이 모두 사라져요
            </span>
            <div className={styles.modalButtonArea}>
              <Button size="medium" backgroundColor="$color-white" onClick={handleDeleteUser}>
                탈퇴하기
              </Button>
              <Button size="medium" backgroundColor="$color-gray-800" onClick={handleModalClose}>
                돌아가기
              </Button>
            </div>
          </div>
        </BottomModal>
      </div>
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

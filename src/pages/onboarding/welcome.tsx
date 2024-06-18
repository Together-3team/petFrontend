import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import ImageBox from '@/components/common/ImageBox';
import Image from '@/assets/exampleProductImg.jpg';
import { fetchMyData } from '@/apis/userApi';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';

import styles from './Welcome.module.scss';

export default function Welcome() {
  const { userData } = useAuth();
  console.log(userData);

  const router = useRouter();
  const nextPage = (router.query.path as string) || '/';
  setTimeout(() => {
    router.push(nextPage);
  }, 2000);

  return (
    <div className={styles.welcomeLayout}>
      <h1 className={styles.welcomeTitle}>환영합니다, {userData.nickname}님!</h1>
      <ImageBox size="welcomePetPhoto" src={Image} alt="환영 이미지" />
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

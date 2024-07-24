import { dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { queryClient } from '@/utils/queryClient';
import { myQueries } from '@/apis/user/queries';
import ImageBox from '@/components/common/ImageBox';
import welcomeDog from '@/assets/images/welcome-dog.png';
import welcomeCat from '@/assets/images/welcome-cat.png';
import welcomePet from '@/assets/images/welcome-pet.png';

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
      <h1 className={styles.welcomeTitle}>환영합니다, {userData.nickname} 님!</h1>
      <ImageBox
        size="welcomePetPhoto"
        src={userData.preferredPet === 0 ? welcomePet : userData.preferredPet === 1 ? welcomeDog : welcomeCat}
        alt="환영 이미지"
      />
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

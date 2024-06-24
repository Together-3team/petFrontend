import { GetServerSidePropsContext } from 'next';
import { dehydrate } from '@tanstack/react-query';

import styles from './LikedPage.module.scss';
import Header from '@/components/common/Layout/Header';
import CartButton from '@/components/common/Button/Cart';
import GitHubBox from '@/components/common/GitHubBox';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';
import useToast from '@/hooks/useToast';
import ScrollTopButton from '@/components/common/Button/ScrollTop';
import CardListZzim from '@/components/common/Card/CardList/Zzim';
import { httpClient } from '@/apis/httpClient';
import { UserResponse } from '@/apis/userApi';
import { queryClient } from '@/utils/queryClient';
import { zzimsQueries } from '@/apis/product/queries';
import FloatingActionBox from '@/components/common/Layout/Footer/FloatingActionBox';

const BOTTOM_BOX_ID = 'bottomBox';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const accessToken = context.req.cookies['accessToken'];

  await zzimsQueries.prefetchQuery();

  try {
    await httpClient().get<UserResponse>(`/users/me`, { headers: { Authorization: `Bearer ${accessToken}` } });
  } catch {
    return {
      redirect: {
        destination: '/my',
        permanent: false,
      },
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function LikedPage() {
  const { showToast, setPortalId } = useToast(BOTTOM_BOX_ID);

  return (
    <div className={styles.layout}>
      <Header.Root className={styles.header}>
        <Header.Box className={styles.headerBox}>
          <Header.Left className={styles.title}>찜</Header.Left>
          <Header.Right>
            <CartButton />
          </Header.Right>
        </Header.Box>
      </Header.Root>
      <CardListZzim />
      <FloatingBox id={BOTTOM_BOX_ID}>
        <NavBottom />
        <FloatingActionBox>
          <ScrollTopButton />
        </FloatingActionBox>
      </FloatingBox>
    </div>
  );
}

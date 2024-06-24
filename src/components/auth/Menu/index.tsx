import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { useCookies } from 'react-cookie';
import useAuth from '@/hooks/useAuth';
import { fetchMyData } from '@/apis/userApi';
import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import NextButton from '@/components/common/Button/NextButton';
import NavBottom from '@/components/common/Nav/Bottom';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import { cartQueries } from '@/apis/cart/queries';
import defaultImg from '@/assets/images/rectangle.png';

import styles from './Menu.module.scss';

export default function Menu() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const { userData } = useAuth();

  function handleLogout() {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
    cartQueries.removeQueries();
  }

  return (
    <div className={styles.menuLayout}>
      <h1>마이페이지</h1>
      <div className={styles.profileArea}>
        <ProfileImgBadge size="large" profileImage={userData.profileImage.split('?')[0] || defaultImg} />
        <h2>{userData.nickname}</h2>
      </div>
      <div className={styles.centerBorder} />
      <div className={styles.menuList}>
        <NextButton href="/my/order">주문내역</NextButton>
        <NextButton href="/my/review">내 리뷰</NextButton>
        <hr />
        <NextButton href="/my/info">회원정보</NextButton>
        <NextButton href="/my/profile">프로필 수정</NextButton>
        <NextButton href="/my/delivery">배송지 목록</NextButton>
        <hr />
        <NextButton href="/" onClick={handleLogout}>
          로그아웃
        </NextButton>
      </div>
      <FloatingBox id={'bottomBox'}>
        <NavBottom />
      </FloatingBox>
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

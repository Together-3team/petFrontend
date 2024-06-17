import Link from 'next/link';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import useAuth from '@/hooks/useAuth';
import LoginButton from '@/components/auth/LoginButton';
import ImageBox from '@/components/common/ImageBox';
import Pets from '@/assets/images/logout-pets.png';
import Menu from '@/components/auth/Menu';

import styles from './My.module.scss';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';
import { fetchMyData } from '@/apis/userApi';
import { GetServerSidePropsContext } from 'next';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

export default function MyPage() {
  const [cookie] = useCookies(['accessToken']);
  const { isLogin } = useAuth();
  if (!isLogin)
    return (
      <div className={cx('myPageLayout')}>
        <span className={cx('myTitle')}>
          공동구매로 최저가 도전!
          <br />
          친구와 함께 할인받으세요
        </span>
        <ImageBox size="myPageFirstPhoto" src={Pets} alt="강아지와 고양이가 환영해주는 사진" />
        <LoginButton />
        <Link href="/">
          <div className={cx('notRegister')}>일단 둘러볼게요</div>
        </Link>
        <FloatingBox>
          <NavBottom />
        </FloatingBox>
      </div>
    );
  if (isLogin) return <Menu />;
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

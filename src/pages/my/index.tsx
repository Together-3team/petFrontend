import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { dehydrate } from '@tanstack/react-query';
import { queryClient } from '@/utils/queryClient';
import classNames from 'classnames/bind';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { myQueries } from '@/apis/user/queries';
import LoginButton from '@/components/auth/LoginButton';
import ImageBox from '@/components/common/ImageBox';
import Pets from '@/assets/images/logout-pets.png';
import Menu from '@/components/auth/Menu';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import NavBottom from '@/components/common/Nav/Bottom';

import styles from './My.module.scss';

const cx = classNames.bind(styles);

export default function MyPage() {
  const { isLogin } = useAuth();
  const router = useRouter();
  const { status } = router.query;
  const BOTTOM_BOX_ID = 'bottomBox';
  const { showToast } = useToast(BOTTOM_BOX_ID);

  useEffect(() => {
    if (status === 'success') {
      showToast({
        status: 'success',
        message: '저장되었습니다.',
      });
    }
    if (status === 'error') {
      showToast({
        status: 'error',
        message: '오류가 발생했습니다. 다시 한 번 시도해 주세요.',
      });
    }
  }, [status]);

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
        <FloatingBox id={BOTTOM_BOX_ID}>
          <NavBottom />
        </FloatingBox>
      </div>
    );
  if (isLogin) return <Menu />;
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

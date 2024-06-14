import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchMyData } from '@/apis/userApi';
import { getCookie } from '@/utils/cookie';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ['user'], queryFn: fetchMyData });

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

export default function useAuth() {
  const [isLogin, setIsLogin] = useState(false);

  const cookie = getCookie({ name: 'accessToken' });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: fetchMyData,
  });

  useEffect(() => {
    if (userData && cookie) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData, cookie]);
  console.log(userData);
  return {
    isLogin,
    setIsLogin,
    userData,
  };
}

{
  /* 로그인 여부를 유저 정보 여부로 판단하는 커스텀 훅입니다.
사용 예시
import useAuth from "@/hooks/useAuth";

export default function 로그인이 필요한 페이지() {

const {isLogin} = useAuth();

if(!isLogin) {
  router.push('/my')
  => 로그인 안 했을 때 실행할 동작
}
if(isLogin) {
  => 로그인 했을 때 실행할 동작
}
}
*/
}

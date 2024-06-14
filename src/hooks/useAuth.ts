import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchMyData } from '@/apis/userApi';

export default function useAuth() {
  const [isLogin, setIsLogin] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: fetchMyData,
  });

  useEffect(() => {
    if (userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  return {
    isLogin,
    setIsLogin,
  };
}

{
  /* 로그인 여부를 유저 정보 여부로 판단하는 커스텀 훅입니다.
사용 예시
import {useRouter} from 'next/router';
import useAuth from "@/hooks/useAuth";

export default function 로그인이 필요한 페이지() {

const {isLogin} = useAuth();

if(!isLogin) {
  router.push('/my')
}
}
*/
}

import { getCookie } from '@/utils/cookie';
import { useEffect, useState } from 'react';

export default function useAuth() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = getCookie({
      name: 'token',
    });
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return {
    isLogin,
    setIsLogin,
  };
}

{
  /* 로그인 여부를 토큰 여부로 판단하는 커스텀 훅입니다.
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

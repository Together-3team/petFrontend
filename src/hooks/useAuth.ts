import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyData } from '@/apis/userApi';
import { useCookies } from 'react-cookie';

export default function useAuth() {
  const [cookie] = useCookies(['accessToken']);
  const { accessToken } = cookie;
  const queryClient = useQueryClient();

  const {
    data: userData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchMyData,
    enabled: !!accessToken,
  });

  if (!accessToken) {
    queryClient.setQueryData(['user'], null);
  }
  const isLogin = !!userData && !!accessToken;

  return {
    isLogin,
    userData,
    refetch,
    isLoading,
  };
}

{
  /* 로그인 여부를 유저 정보 여부로 판단하는 커스텀 훅입니다.
사용 예시
import useAuth from "@/hooks/useAuth";

export default function 로그인이 필요한 페이지() {

const {isLogin} = useAuth();
const {userData} = useAuth(); => 유저 데이터 가져올 때 사용

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

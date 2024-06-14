import { useCookies } from 'react-cookie';

export default function useAccessToken() {
  const [cookies] = useCookies(['accessToken']);
  return cookies.accessToken;
}

{
  /* 사용 예시
  import { useAccessToken } from '@/hooks/useAccessToken'; 
  const accessToken = useAccessToken();*/
}

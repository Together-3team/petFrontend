import { useCookies } from 'react-cookie';

export default function useAccessToken() {
  const [cookies] = useCookies(['accessToken']);
  return cookies.accessToken;
}

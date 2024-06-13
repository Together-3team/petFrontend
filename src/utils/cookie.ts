import { Cookies } from 'react-cookie';

interface CookieProps {
  name: string;
  value?: string;
  option?: object;
}

//토큰을 쿠키에 저장
const cookies = new Cookies();

export function setCookie({ name, value, option }: CookieProps) {
  return cookies.set(name, value, { ...option });
}

export function getCookie({ name }: CookieProps) {
  return cookies.get(name);
}

export function removeCookie({ name, option }: CookieProps) {
  return cookies.remove(name, { ...option });
}

// auth flow
// 1. 구글 인증하고 registered: false면
// 2. 회원가입 페이지로 넘어가서 post하고
// 3. 그 후에 구글 인증을 다시 하면 accessToken 발급
// 4. accessToken 유효기간 2시간, refreshToken으로 토큰을 갱신해야 한다.

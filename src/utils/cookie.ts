import { setCookie } from 'cookies-next';

//토큰을 쿠키에 저장

export default function saveTokenToCookie(token: string) {
  setCookie('accessToken', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

// auth
// 1. 구글 인증하고 registered: false면
// 2. 회원가입 페이지로 넘어가서 post하고
// 3. 그 후에 구글 인증을 다시 하면 accessToken 발급
// 4. accessToken 유효기간 2시간, refreshToken으로 토큰을 갱신해야 한다.

import { KAKAO_AUTH_URL } from '@/constants/oAuth';
import Link from 'next/link';

export default function KakaoLogin() {
  return (
    <>
      <Link href={KAKAO_AUTH_URL}>
        <div>카카오로 계속하기</div>
      </Link>
    </>
  );
}

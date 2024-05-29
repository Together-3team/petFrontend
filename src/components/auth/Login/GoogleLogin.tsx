import { GOOGLE_AUTH_URL } from '@/constants/oAuth';
import Link from 'next/link';

export default function GoogleLogin() {
  return (
    <>
      <Link href={GOOGLE_AUTH_URL}>
        <div>Google로 계속하기</div>
      </Link>
    </>
  );
}

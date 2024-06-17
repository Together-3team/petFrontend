import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import NextButton from '@/components/common/Button/NextButton';
import NavBottom from '@/components/common/Nav/Bottom';
import { useCookies } from 'react-cookie';

import styles from './Menu.module.scss';
import { useRouter } from 'next/router';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';

export default function Menu() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const router = useRouter();

  function handleLogout() {
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
  }

  return (
    <div className={styles.menuLayout}>
      <h1>마이페이지</h1>
      <div className={styles.profileArea}>
        <ProfileImgBadge size="large" />
        <h2>해피사랑님</h2>
      </div>
      <div className={styles.centerBorder} />
      <div className={styles.menuList}>
        <NextButton href="/my/order">주문내역</NextButton>
        <NextButton href="">내 리뷰</NextButton>
        <hr />
        <NextButton href="/my/info">회원정보</NextButton>
        <NextButton href="/my/profile">프로필 수정</NextButton>
        <NextButton href="">배송지 목록</NextButton>
        <hr />
        <NextButton href="/" onClick={handleLogout}>
          로그아웃
        </NextButton>
      </div>
      <FloatingBox id={'bottomBox'}>
        <NavBottom />
      </FloatingBox>
    </div>
  );
}

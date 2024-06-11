import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import NextButton from '@/components/common/Button/NextButton';
import NavBottom from '@/components/common/Nav/Bottom';

import styles from './My.module.scss';
//TODO: 인증 후 my>index.txs에 합치기
export default function Menu() {
  return (
    <div className={styles.menuLayout}>
      <h1>마이페이지</h1>
      <div className={styles.profileArea}>
        <ProfileImgBadge size="large" />
        <h2>해피사랑님</h2>
      </div>
      <div className={styles.centerBorder} />
      <div className={styles.menuList}>
        <NextButton href="">주문내역</NextButton>
        <NextButton href="">내 리뷰</NextButton>
        <hr />
        <NextButton href="">회원정보</NextButton>
        <NextButton href="">프로필 수정</NextButton>
        <NextButton href="">배송지 목록</NextButton>
        <hr />
        <NextButton href="">로그아웃</NextButton>
      </div>
      <NavBottom />
    </div>
  );
}

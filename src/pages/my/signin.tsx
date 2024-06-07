import ProfileImgBadge from '@/components/common/Badge/ProfileImgBadge';
import NextButton from '@/components/common/Button/NextButton';

import styles from './My.module.scss';

export default function signin() {
  return (
    <div>
      <h1>마이페이지</h1>
      <ProfileImgBadge size="small" />
      <h2>해피사랑님</h2>
      <div>
        <NextButton text="주문내역" href="" />
      </div>
    </div>
  );
}

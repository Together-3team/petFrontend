// import Image from 'next/image'; 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 !
import ProfileImgBadge from '../Badge/ProfileImgBadge';
import StarRating from './StarRating';
import Textarea from './Textarea';
import formatDate from '@/utils/formatDate';
import styles from './ReviewBox.module.scss';

export default function ReviewBox() {
  const testData = {
    nickname: '서리핑',
    option: '소고기맛/선물포장',
    quantity: 3,
    rating: 4,
    description:
      '설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워 설이는 귀여워',
    createdAt: '2024-05-24T14:35:22.000Z',
  };

  const formattedDate = formatDate(testData.createdAt);

  return (
    <div className={styles.reviewBoxLayout}>
      <div className={styles.userInfo}>
        <ProfileImgBadge className={styles.profileImg} />
        <div className={styles.userInfoDetail}>
          <div className={styles.nicknameAndDate}>
            <p className={styles.nickname}>{testData.nickname}</p>
            <p className={styles.date}>{formattedDate}</p>
          </div>
          <div className={styles.productDetail}>
            <p className={styles.option}>
              옵션
              <span className={styles.optionDetail}>
                {testData.option} | {testData.quantity}개
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ratingBox}>
        <StarRating rating={testData.rating} />
        <p className={styles.ratingCount}>{testData.rating}.0</p>
      </div>
      {/* <Image /> 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 ! */}
      <Textarea disabled value={testData.description} className={styles.description} />
    </div>
  );
}

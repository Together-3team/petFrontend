// import Image from 'next/image'; 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 !
import ProfileImgBadge from '../Badge/ProfileImgBadge';
import StarRating from './StarRating';
import Textarea from './Textarea';
import formatDate from '@/utils/formatDate';
import styles from './ReviewBox.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ReviewBox({ reviewData, className }: any) {
  const formattedDate = formatDate(reviewData.createdAt);

  return (
    <div className={cx('reviewBoxLayout', className)}>
      <div className={styles.userInfo}>
        <ProfileImgBadge className={styles.profileImg} />
        <div className={styles.userInfoDetail}>
          <div className={styles.nicknameAndDate}>
            <p className={styles.nickname}>{reviewData.nickname}</p>
            <p className={styles.date}>{formattedDate}</p>
          </div>
          <div className={styles.productDetail}>
            <p className={styles.option}>
              옵션
              <span className={styles.optionDetail}>
                {reviewData.option} | {reviewData.quantity}개
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ratingBox}>
        <StarRating rating={reviewData.rating} />
        <p className={styles.ratingCount}>{reviewData.rating}.0</p>
      </div>
      {/* <Image /> 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 ! */}
      <Textarea disabled value={reviewData.description} className={styles.description} />
    </div>
  );
}

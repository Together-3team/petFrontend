import Image from 'next/image';
import ProfileImgBadge from '../Badge/ProfileImgBadge';
import StarRating from './StarRating';
import Textarea from './Textarea';
import styles from './ReviewBox.module.scss';

export default function ReviewBox() {
  const testData = {
    nickname: '뽀수니',
    option: '소고기맛',
    quantity: 3,
    rating: 4,
    description: '강아지가 너무 좋아해요~~ 입맛까다로운 우리집 치와와도 잘 먹네요 ^^ 강추!!합니다~~',
    createdAt: '2024-05-24T14:35:22.000Z',
  };

  const date = new Date(testData.createdAt);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0'); // 일

  const formattedDate = `${year}.${month}.${day}`;

  return (
    <div className={styles.reviewBox}>
      <div className={styles.userInfo}>
        <ProfileImgBadge className={styles.profileImg} />
        <div className={styles.text}>
          <div className={styles.nicknameAndTime}>
            <p className={styles.nickname}>{testData.nickname}</p>
            <p className={styles.time}>{formattedDate}</p>
          </div>
          <div className={styles.productDetail}>
            <p>
              옵션<span>{testData.option}</span>
            </p>
            <p>
              수량<span>{testData.quantity}개</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.ratingBox}>
        <StarRating rating={testData.rating} />
        <p className={styles.ratingCount}>{testData.rating}.0</p>
      </div>
      {/* <Image /> 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 ! */}
      <Textarea disabled value={testData.description} />
    </div>
  );
}

// 고유ID
// 상품참조키
// 사용자참조키

// 별점 rating
// 리뷰이미지 reveiwImages
// 설명 description
// 삭제여부 isDeleted
// 생성일 createdAt

import Image from 'next/image';
import ProfileImgBadge from '../Badge/ProfileImgBadge';
import StarRating from './StarRating';
import Textarea from './Textarea';
import styles from './ReviewBox.module.scss';

export default function ReviewBox() {
  return (
    <div>
      <div>
        <div>
          <ProfileImgBadge />
          <div>
            <p>사용자 닉네임</p>
            <div>
              <p>옵션</p>
              <p>수량</p>
            </div>
          </div>
        </div>
        <p>리뷰 작성 날짜</p>
      </div>
      <StarRating rating={5} />
      {/* <Image /> 리뷰 이미지 넣을 수 있는 기능 추가되면 넣을게요 ! */}
      <Textarea disabled value={'testtesttesttesttesttesttesttesttesttesttesttesttesttest'} />
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

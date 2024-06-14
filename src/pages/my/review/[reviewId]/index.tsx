import Image from 'next/image';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import StarRating from '@/components/common/review/StarRating';
import Textarea from '@/components/common/review/Textarea';
import testImage from '@/assets/images/rectangle.png';
import styles from './ReviewDetailPage.module.scss';

export default function ReviewDetailPage() {
  return (
    <div>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center>리뷰 상세보기</Header.Center>
        </Header.Box>
      </Header.Root>
      <div>
        <div>
          <Image src={testImage} alt="상품 이미지" />
          <div className={styles.productData}>
            <p className={styles.productName}>호랑이 간식 27종</p>
            <p className={styles.productOption}>호랑이 독 리얼큐브 소고기 300g | 1개</p>
          </div>
        </div>
        <div>
          <div>
            <StarRating rating={5} />
            <p>5.0</p>
          </div>
          <p>2024.05.04</p>
        </div>
        <Textarea disabled />
      </div>
    </div>
  );
}

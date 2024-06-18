import Image from 'next/image';
import testImage from '@/assets/images/rectangle.png';
import styles from './ReviewProductDataCard.module.scss';

export default function ReviewProductDataCard() {
  return (
    <div className={styles.productDataBox}>
      <Image className={styles.productImg} src={testImage} alt="상품 이미지" />
      <div className={styles.productData}>
        <p className={styles.productName}>호랑이 간식 27종</p>
        <p className={styles.productOption}>호랑이 독 리얼큐브 소고기 300g | 1개</p>
      </div>
    </div>
  );
}

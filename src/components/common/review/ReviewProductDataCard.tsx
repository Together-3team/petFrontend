import Image from 'next/image';
import styles from './ReviewProductDataCard.module.scss';

interface PurchaseInfo {
  combinationName: string;
  quantity: number;
  thumbNailImage: string;
  title: string;
}

interface ReviewProductDataCardProps {
  purchaseInfo: PurchaseInfo;
}

export default function ReviewProductDataCard({ purchaseInfo }: ReviewProductDataCardProps) {
  return (
    <div className={styles.productDataBox}>
      <Image className={styles.productImg} width={44} height={44} src={purchaseInfo.thumbNailImage} alt="상품 이미지" />
      <div className={styles.productData}>
        <p className={styles.productName}>{purchaseInfo.title}</p>
        <p className={styles.productOption}>
          {purchaseInfo.combinationName} | {purchaseInfo.quantity}개
        </p>
      </div>
    </div>
  );
}

import Card, { ProductInfo } from '@/components/common/Card';
import Button from '@/components/common/Button';

import styles from './ReviewCard.module.scss';

interface ReviewCardProps {
  href?: string;
  productInfo: ProductInfo;
  onClick: () => void;
}

export default function ReviewCard({ href, productInfo, onClick }: ReviewCardProps) {
  return (
    <div className={styles.reviewCardArea}>
      <div className={styles.reviewCardLayout}>
        <Card href={href} productInfo={productInfo} direction="row" size="miniImage" />
        <div className={styles.reviewCardButton}>
          <Button size="large" backgroundColor="$color-white-pink" onClick={onClick}>
            리뷰 쓰기
          </Button>
        </div>
        <hr className={styles.updownBorder} />
      </div>
    </div>
  );
}

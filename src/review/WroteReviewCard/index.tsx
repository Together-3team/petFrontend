import Card, { ProductInfo } from '@/components/common/Card';

import styles from './WrotereviewCard.module.scss';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';

interface WroteReviewCardProps {
  href: string;
  productInfo: ProductInfo;
  onClick: () => void;
}

export default function WroteReviewCard({ href, productInfo, onClick }: WroteReviewCardProps) {
  return (
    <div className={styles.reviewCardArea}>
      <div className={styles.reviewCardLayout}>
        <Card productInfo={productInfo} direction="row" size="miniImage" />
        <NextButtonTemp href={href} />
        <hr className={styles.updownBorder} />
      </div>
    </div>
  );
}

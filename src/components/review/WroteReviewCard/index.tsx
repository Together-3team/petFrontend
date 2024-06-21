import Card, { ProductInfo } from '@/components/common/Card';
import NextButtonTemp from '@/components/common/Button/NextButtonTemp';

import styles from './WroteReviewCard.module.scss';

interface WroteReviewCardProps {
  href: string;
  productInfo: ProductInfo;
}

export default function WroteReviewCard({ href, productInfo }: WroteReviewCardProps) {
  return (
    <div className={styles.wroteReviewCardArea}>
      <div className={styles.wroteReviewCardLayout}>
        <Card href={href} productInfo={productInfo} direction="row" size="miniImage" />
        <NextButtonTemp href={href} />
      </div>
      <hr className={styles.updownBorder} />
    </div>
  );
}

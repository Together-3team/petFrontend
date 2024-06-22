import Card, { ProductInfo } from '../../common/Card';
import Button from '../../common/Button';

import styles from './OrderCard.module.scss';

interface OrderCardProps {
  productInfo: ProductInfo;
  tagText: string;
  href?: string;
  onClick?: () => void;
}

export default function OrderCard({ href, productInfo, tagText, onClick }: OrderCardProps) {
  return (
    <>
      <hr className={styles.updownBorder} />
      <div className={styles.orderCardLayout}>
        <Card productInfo={productInfo} direction="row" size="miniImage" tagText={tagText} href={href} />
        <div className={styles.orderCardButtons}>
          <Button size="small" backgroundColor="$color-white-gray" onClick={onClick}>
            주문 취소
          </Button>
          <Button size="small" backgroundColor="$color-gray-100">
            배송 조회
          </Button>
          <Button size="small" backgroundColor="$color-gray-100">
            리뷰 쓰기
          </Button>
        </div>
      </div>
    </>
  );
}

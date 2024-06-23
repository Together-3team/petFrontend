import Card, { ProductInfo } from '../../common/Card';
import OrderCardButton from './OrderCardButton';

import styles from './OrderCard.module.scss';

interface OrderCardProps {
  productInfo: ProductInfo;
  tagText: string;
  href?: string;
  status: number;
  onClick: () => void;
}

export default function OrderCard({ href, productInfo, tagText, onClick, status }: OrderCardProps) {
  return (
    <>
      <hr className={styles.updownBorder} />
      <div className={styles.orderCardLayout}>
        <Card productInfo={productInfo} direction="row" size="miniImage" tagText={tagText} href={href} />
        <OrderCardButton onClick={onClick} status={status} />
      </div>
    </>
  );
}

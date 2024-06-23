import Card, { ProductInfo } from '../../common/Card';
import Button from '../../common/Button';

import styles from './OrderCard.module.scss';
import OrderCardButton from './OrderCardButton';

interface OrderCardProps {
  productInfo: ProductInfo;
  tagText: string;
  href?: string;
  onClick: () => void;
}

export default function OrderCard({ href, productInfo, tagText, onClick }: OrderCardProps) {
  return (
    <>
      <hr className={styles.updownBorder} />
      <div className={styles.orderCardLayout}>
        <Card productInfo={productInfo} direction="row" size="miniImage" tagText={tagText} href={href} />
        <OrderCardButton onClick={onClick} />
      </div>
    </>
  );
}

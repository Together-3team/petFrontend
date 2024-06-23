import Card, { ProductInfo } from '../../common/Card';
import OrderCardButton from './OrderCardButton';

import styles from './OrderCard.module.scss';
import { MouseEventHandler } from 'react';

interface OrderCardProps {
  productInfo: ProductInfo;
  tagText: string;
  href?: string;
  status: number;
  buttons?: { id: number; name: string; disabled: boolean; onClick: MouseEventHandler<HTMLButtonElement> }[][];
}

export default function OrderCard({ href, productInfo, tagText, buttons, status }: OrderCardProps) {
  return (
    <>
      <hr className={styles.updownBorder} />
      <div className={styles.orderCardLayout}>
        <Card productInfo={productInfo} direction="row" size="miniImage" tagText={tagText} href={href} />
        {buttons ? <OrderCardButton buttons={buttons} status={status} /> : null}
      </div>
    </>
  );
}

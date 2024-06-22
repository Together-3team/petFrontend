import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import purchaseApi from '@/apis/purchase/api';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import { ProductInfo } from '@/components/common/Card';
import OrderFilterBar from '@/components/order/OrderFilterBar';
import OrderCard from '@/components/order/OrderCard';
import { PurchaseDataProps } from '@/pages/my/review';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
  const router = useRouter();

  const { data: purchaseData } = useQuery({ queryKey: ['purchase'], queryFn: purchaseApi.getPurchase });
  console.log(purchaseData);

  const purchaseId = purchaseData?.data.map((item: PurchaseDataProps) => {
    return item.id;
  });

  const { data: purchaseDetailData } = useQuery({
    queryKey: ['purchaseDetail', purchaseId],
    queryFn: async () => {
      const response = purchaseApi.getDetailPurchase(purchaseId);
      return response;
    },
  });

  console.log(purchaseDetailData);

  const purchaseList =
    purchaseData &&
    purchaseData.data.flatMap((item: PurchaseDataProps) =>
      item.purchaseProducts.map((product: ProductInfo) => ({
        productId: product.productId,
        title: product.title,
        thumbNailImage: product.thumbNailImage,
        originalPrice: product.originalPrice,
        price: product.price,
        option: product.combinationName,
        quantity: product.quantity,
        stock: 1,
        status: product.status,
      }))
    );

  // const { mutateAsync: mutation } = useMutation({
  //   mutationKey: ['changePurchaseStatus'],
  //   mutationFn: async ({ id, body }: { id: number; body: number }) => {
  //     const response = await purchaseApi.putPaymentStatus(id, body);
  //     return response;
  //   },
  // });

  // function handleClick() {
  //   mutation;
  // }
  function handleMoveOrderDetail(purchaseId: number) {
    router.push({
      pathname: `/my/order/${purchaseId}`,
      query: {
        purchaseData: purchaseDetailData?.data,
      },
    });
  }

  return (
    <div className={styles.orderLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <h1>주문내역</h1>
        </Header.Box>
      </Header.Root>
      <OrderFilterBar />
      <div className={styles.orderList}>
        <div className={styles.orderInfo}>
          <div className={styles.orderInfoUp}>
            <span className={styles.orderDate}>2024.05.21</span>
            <div className={styles.orderDetail} onClick={() => handleMoveOrderDetail(purchaseId)}>
              주문상세
            </div>
          </div>
          <span className={styles.orderNumber}>주문번호 No. {purchaseId}</span>
        </div>
        <div className={styles.orderCards}>
          {purchaseData &&
            purchaseList.map((purchase: ProductInfo) => (
              <OrderCard
                key={purchase.productId}
                productInfo={purchase}
                href="/my/order"
                tagText={
                  purchase.status === 2
                    ? '주문 완료'
                    : purchase.status === 3
                      ? '배송 준비'
                      : purchase.status === 4
                        ? '배송 중'
                        : purchase.status === 5
                          ? '배송 완료'
                          : '취소 / 환불'
                }
              />
            ))}
        </div>
      </div>
    </div>
  );
}

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
import Empty from '@/components/order/Empty';

import styles from './Order.module.scss';
import formatDate from '@/utils/formatDate';

const cx = classNames.bind(styles);

export default function Order() {
  const router = useRouter();

  const { data: purchaseData } = useQuery({ queryKey: ['purchase'], queryFn: purchaseApi.getPurchase });
  console.log(purchaseData);

  const purchaseList = purchaseData?.data.flatMap((item: PurchaseDataProps) =>
    item.purchaseProducts.map((product: ProductInfo) => ({
      productId: product.productId,
      title: product.title,
      thumbNailImage: product.thumbNailImage,
      originalPrice: product.originalPrice,
      price: product.price,
      option: product.combinationName,
      quantity: product.quantity,
      stock: 1,
      status: product.paymentStatus,
    }))
  );

  function handleMoveOrderDetail({ purchaseId, purchaseDate }: { purchaseId: number; purchaseDate: string }) {
    router.push({
      pathname: `/my/order/${purchaseId}`,
      query: { purchaseId, purchaseDate },
    });
  }

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
        {purchaseData && purchaseData.data && purchaseData.data.length > 0 ? (
          purchaseData.data.map((item: PurchaseDataProps) => (
            <div key={item.id}>
              <div className={styles.orderInfo}>
                <div className={styles.orderInfoUp}>
                  <span className={styles.orderDate}>{formatDate(item.createdAt)}</span>
                  <div
                    className={styles.orderDetail}
                    onClick={() => handleMoveOrderDetail({ purchaseId: item.id, purchaseDate: item.createdAt })}>
                    주문상세
                  </div>
                </div>
                <span className={styles.orderNumber}>주문번호 No. {item.id}</span>
              </div>
              <div className={styles.orderCards}>
                {purchaseList &&
                  (purchaseList.length > 0 ? (
                    purchaseList.map((purchase: ProductInfo) => (
                      <OrderCard
                        key={purchase.productId}
                        productInfo={purchase}
                        href="/my/order"
                        tagText={
                          purchase.paymentStatus === 0
                            ? '공동구매 대기'
                            : purchase.paymentStatus === 1
                              ? '공동구매 완료'
                              : purchase.paymentStatus === 2
                                ? '주문 완료'
                                : purchase.paymentStatus === 3
                                  ? '배송 준비'
                                  : purchase.paymentStatus === 4
                                    ? '배송 중'
                                    : purchase.paymentStatus === 5
                                      ? '배송 완료'
                                      : '취소/환불'
                        }
                      />
                    ))
                  ) : (
                    <div>주문한 상품이 없습니다.</div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

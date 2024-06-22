import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import purchaseApi from '@/apis/purchase/api';
import formatDate from '@/utils/formatDate';
import Loading from '@/components/common/Loading';
import useToast from '@/hooks/useToast';
import getTagText from '@/utils/getTagText';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import { ProductInfo } from '@/components/common/Card';
import OrderFilterBar from '@/components/order/OrderFilterBar';
import OrderCard from '@/components/order/OrderCard';
import { PurchaseDataProps } from '@/pages/my/review';
import Empty from '@/components/order/Empty';

import styles from './Order.module.scss';

const cx = classNames.bind(styles);

export default function Order() {
  const router = useRouter();
  const { showToast } = useToast();

  const { data: purchaseData } = useQuery({ queryKey: ['purchase'], queryFn: purchaseApi.getPurchase });
  console.log(purchaseData);

  const purchaseList = purchaseData?.data.flatMap((item: PurchaseDataProps) =>
    item.purchaseProducts.map((product: ProductInfo) => ({
      productId: product.productId,
      id: product.id,
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

  console.log(purchaseList);

  function handleMoveOrderDetail({ purchaseId, purchaseDate }: { purchaseId: number; purchaseDate: string }) {
    router.push({
      pathname: `/my/order/${purchaseId}`,
      query: { purchaseId, purchaseDate },
    });
  }

  const cancelMutation = useMutation({
    mutationKey: ['cancelPurchase'],
    mutationFn: async (id: number) => {
      const response = await purchaseApi.delete(id);
      return response.data;
    },
  });

  async function handleCancelPurchase(id: number) {
    try {
      await cancelMutation.mutateAsync(id);
      showToast({ status: 'success', message: '해당 상품 주문을 취소했습니다.' });
    } catch (error) {
      showToast({ status: 'error', message: '오류가 발생했습니다. 다시 한 번 시도해 주세요.' });
      console.error('Error cancel purchase:', error);
    }
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
  if (!purchaseData) return <Loading />;
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
                {item.purchaseProducts && item.purchaseProducts.length > 0 ? (
                  item.purchaseProducts.map((purchase: ProductInfo) => (
                    <OrderCard
                      key={purchase.id}
                      productInfo={{ ...purchase, stock: 1, option: purchase.combinationName }}
                      href="/my/order"
                      onClick={() => handleCancelPurchase(item.id)}
                      tagText={getTagText(purchase.status)}
                    />
                  ))
                ) : (
                  <div>주문한 상품이 없습니다.</div>
                )}
                <div className={styles.rectangle} />
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

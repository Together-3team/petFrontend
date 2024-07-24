import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { purchaseQueries } from '@/apis/purchase/queries';
import formatDate from '@/utils/formatDate';
import Loading from '@/components/common/Loading';
import useToast from '@/hooks/useToast';
import getTagText from '@/utils/getTagText';
import Header from '@/components/common/Layout/Header';
import BackButton from '@/components/common/Button/BackButton';
import { ProductInfo } from '@/components/common/Card';
import OrderFilterBar from '@/components/order/OrderFilterBar';
import OrderCard from '@/components/order/OrderCard';
import { PurchaseData, PurchaseDataProps } from '@/pages/my/review';
import Empty from '@/components/order/Empty';

import styles from './Order.module.scss';
import { getWroteReviewList } from '@/apis/myReviewAPI';

export default function Order() {
  const router = useRouter();
  const { showToast } = useToast();
  const [filterId, setFilterId] = useState<number>(0);

  const { data: purchaseData } = useQuery(purchaseQueries.queryOptions());

  const filteredPurchaseProductsData = purchaseData?.data.flatMap((item: PurchaseDataProps) =>
    item.purchaseProducts.filter((product: ProductInfo) => (filterId === 0 ? true : product.status === filterId - 1))
  );

  function handleFilterChange(filterId: number) {
    setFilterId(filterId);
  }

  function handleMoveOrderDetail({ purchaseId, purchaseDate }: { purchaseId: number; purchaseDate: string }) {
    router.push({
      pathname: `/my/order/${purchaseId}`,
      query: { purchaseId, purchaseDate },
    });
  }

  const { data: wroteReviews } = useQuery({
    queryKey: ['wroteReviews'],
    queryFn: getWroteReviewList,
  });

  const notReviewableId = wroteReviews?.data.map((item: PurchaseData) => item.id);

  const { mutateAsync: mutation } = purchaseQueries.usePutPurchaseMutation();

  async function handleCancelPurchase(purchaseId: number) {
    try {
      await mutation({
        id: purchaseId,
        body: {
          status: 6,
          deliveryCompany: 'string',
          trackingNumber: 'string',
        },
      });
      showToast({ status: 'success', message: '해당 상품 주문을 취소했습니다.' });
    } catch (error) {
      showToast({ status: 'error', message: '오류가 발생했습니다. 다시 한 번 시도해 주세요.' });
      console.error('Error cancel purchase:', error);
    }
  }

  async function handleExchangeOrRefund(purchaseId: number) {
    try {
      await mutation({
        id: purchaseId,
        body: {
          status: 6,
          deliveryCompany: '우체국 택배',
          trackingNumber: '111',
        },
      });
      showToast({ status: 'success', message: '교환/환불을 진행 중입니다.' });
    } catch (error) {
      showToast({ status: 'error', message: '오류가 발생했습니다. 다시 한 번 시도해 주세요.' });
      console.error('Error handling exchange/refund:', error);
    }
  }

  function handleCheckDeliver() {
    showToast({ status: 'success', message: '배송 조회를 진행 중입니다.' });
  }

  function handleWriteReview(purchase: PurchaseData) {
    console.log(purchase);
    return () => {
      router.push({
        pathname: `/my/review/write`,
        query: {
          id: purchase.id,
          title: purchase.title,
          combinationName: purchase.combinationName,
          quantity: purchase.quantity,
          thumbNailImage: purchase.thumbNailImage,
          productId: 1,
        },
      });
    };
  }

  const firstButton = (purchaseId: number) => [
    {
      id: 1,
      name: '주문 취소',
      disabled: false,
      onClick: () => handleCancelPurchase(purchaseId),
    },
    { id: 2, name: '교환/환불', disabled: false, onClick: () => handleExchangeOrRefund(purchaseId) },
    { id: 3, name: '교환/환불', disabled: false, onClick: () => handleExchangeOrRefund(purchaseId) },
    { id: 4, name: '배송 조회', disabled: false, onClick: handleCheckDeliver },
  ];

  const secondButton = (purchaseId: number) => [
    { id: 1, name: '배송 조회', disabled: true, onClick: handleCheckDeliver },
    { id: 2, name: '배송 조회', disabled: false, onClick: handleCheckDeliver },
    { id: 3, name: '배송 조회', disabled: false, onClick: handleCheckDeliver },
    { id: 4, name: '교환/환불', disabled: true, onClick: () => handleExchangeOrRefund(purchaseId) },
  ];

  const thirdButton = (purchase: PurchaseData) => [
    {
      id: 1,
      name: '리뷰 쓰기',
      disabled: true,
      onClick: handleWriteReview(purchase),
    },
    { id: 2, name: '리뷰 쓰기', disabled: true, onClick: handleWriteReview(purchase) },
    {
      id: 3,
      name: notReviewableId?.length > 0 && notReviewableId.includes(purchase.id) ? '리뷰 작성 완료' : '리뷰 쓰기',
      disabled: notReviewableId?.length > 0 && notReviewableId.includes(purchase.id) ? true : false,
      onClick: handleWriteReview(purchase),
    },
    { id: 4, name: '리뷰 쓰기', disabled: true, onClick: handleWriteReview(purchase) },
  ];

  if (!purchaseData) return <Loading />;
  if (!purchaseData || (purchaseData.data && purchaseData.data.length === 0)) return <Empty />;
  return (
    <div className={styles.orderLayout}>
      <Header.Root>
        <Header.Box>
          <Header.Left>
            <BackButton href="/my" />
          </Header.Left>
          <h1>주문내역</h1>
        </Header.Box>
      </Header.Root>
      <div className={styles.orderList}>
        <OrderFilterBar onFilterChange={handleFilterChange} />
        {filteredPurchaseProductsData.length <= 0 && <div className={styles.noOrder}>해당 상품이 없습니다.</div>}
        {purchaseData &&
          purchaseData.data &&
          purchaseData.data.length > 0 &&
          purchaseData.data
            .sort(
              (a: PurchaseDataProps, b: PurchaseDataProps): number =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
            .map(
              (item: PurchaseDataProps) =>
                item.purchaseProducts.filter((product: ProductInfo) =>
                  filterId === 0 ? true : product.status === filterId - 1
                ).length > 0 && (
                  <div key={item.id}>
                    {filteredPurchaseProductsData.length > 0 && (
                      <div className={styles.orderInfo}>
                        <div className={styles.orderInfoUp}>
                          <span className={styles.orderDate}>{formatDate(item.createdAt)}</span>
                          <div
                            className={styles.orderDetail}
                            onClick={() =>
                              handleMoveOrderDetail({ purchaseId: item.id, purchaseDate: item.createdAt })
                            }>
                            주문상세
                          </div>
                        </div>
                        <span className={styles.orderNumber}>주문번호 No. {item.id}</span>
                      </div>
                    )}
                    <div className={styles.orderCards}>
                      {item.purchaseProducts
                        .filter((product: ProductInfo) => (filterId === 0 ? true : product.status === filterId - 1))
                        .map((purchase: ProductInfo) => (
                          <OrderCard
                            key={purchase.id}
                            href={`/my/order/${item.id}`}
                            productInfo={{
                              ...purchase,
                              stock: 3,
                              option: purchase.combinationName,
                              originalPrice: purchase.originalPrice * (purchase?.quantity || 0),
                              price: purchase.price * (purchase?.quantity || 0),
                            }}
                            status={purchase.status as number}
                            buttons={[
                              firstButton(purchase.id as number),
                              secondButton(purchase.id as number),
                              thirdButton(purchase),
                            ]}
                            tagText={getTagText(purchase.status)}
                          />
                        ))}
                      {item.purchaseProducts.filter((product: ProductInfo) =>
                        filterId === 0 ? true : product.status === filterId - 1
                      ).length > 0 && <div className={styles.rectangle} />}
                    </div>
                  </div>
                )
            )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import styles from './Cart.module.scss';
import Card from '@/components/cart/Card';

export default function Cart() {
  // 더미 데이터
  const initialProducts = [
    {
      id: 1,
      productTitle: '강아지 간식 27종',
      option: '강아지 독 리얼큐브 소고기 300g',
      productCost: 11800,
      productNumber: 2,
      imageUrl: '/images/exampleProductImg.jpg',
    },
    {
      id: 2,
      productTitle: '강아지 간식 27종',
      option: '강아지 독 리얼큐브 소고기 500g',
      productCost: 20000,
      productNumber: 3,
      imageUrl: '/images/exampleProductImg.jpg',
    },
    {
      id: 3,
      productTitle: '고양이 간식 27종',
      option: '강아지 츄르 5스틱g',
      productCost: 11000,
      productNumber: 10,
      imageUrl: '/images/exampleProductImg.jpg',
    },
  ];

  // 상품목록 없는 경우 더미데이터
  // const initialProducts: {
  //   id: number;
  //   productTitle: string;
  //   option: string;
  //   productCost: number;
  //   productNumber: number;
  // }[] = [];

  const [products, setProducts] = useState(initialProducts.map(product => ({ ...product, isChecked: true })));
  const [selectAll, setSelectAll] = useState(true); // 전체 체크 상태

  // selectAll 상태 반전
  function handleSelectAll() {
    setSelectAll(!selectAll);

    const updatedProducts = products.map(product => ({
      ...product,
      isChecked: !selectAll,
    }));

    setProducts(updatedProducts);
  }

  // 개별 제품 체크박스 클릭 시 해당 제품 선택 상태 변경
  function handleProductCheck(id: number) {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, isChecked: !product.isChecked } : product
    );

    setProducts(updatedProducts);

    // 모든 제품의 선택 상태 확인
    const allChecked = updatedProducts.every(product => product.isChecked);
    setSelectAll(allChecked);
  }

  // 선택한 제품의 총 가격 계산
  function calculateTotalPrice() {
    return products
      .filter(product => product.isChecked)
      .reduce((total, product) => {
        return total + product.productCost * product.productNumber;
      }, 0);
  }

  const totalPrice = calculateTotalPrice();

  return (
    <>
      <div className={styles.cart}>
        {products.length > 0 ? (
          <>
            <div className={styles.totalCheckbox}>
              <input type="checkbox" name="totalCheck" checked={selectAll} onChange={handleSelectAll} />
              <div className={styles.totalNumber}>전체 {products.length}개</div>
            </div>
            {products.map((product, index) => (
              <Card
                key={product.id}
                productTitle={product.productTitle}
                option={product.option}
                productCost={product.productCost}
                isChecked={product.isChecked}
                productNumber={product.productNumber}
                imageUrl={product.imageUrl}
                onCheck={() => handleProductCheck(product.id)}
              />
            ))}
            <div className={styles.calculateContainer}>
              <div className={styles.totalNumberTitle}>결제 상품 총 {products.length}개</div>
              <div className={styles.individualCost}>
                <div className={`${styles.pricePair} ${styles.gray}`}>
                  <div>원가</div>
                  <div>{totalPrice}원</div>
                </div>
                <div className={styles.pricePair}>
                  <div>할인가</div>
                  <div>{totalPrice}원</div>
                </div>
                <div className={styles.pricePair}>
                  <div>할인 금액</div>
                  <div>-0원</div>
                </div>
                <div className={styles.pricePair}>
                  <div>배송비</div>
                  <div>무료배송</div>
                </div>
              </div>
              <div className={styles.line}></div>
              <div className={styles.totalPrice}>
                <div>총 결제 금액</div>
                <div>{totalPrice}원</div>
              </div>
            </div>
          </>
        ) : (
          <p className={styles.noProduct}>아직 담은 상품이 없어요</p>
        )}
      </div>
    </>
  );
}

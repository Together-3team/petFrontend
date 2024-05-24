import React, { useState } from 'react';
import styles from './Cart.module.scss';
import Card from '@/components/cart/Card';

export default function Cart() {
  // 더미 데이터
  const products = [
    { id: 1, productTitle: '강아지 간식 27종', option: '강아지 독 리얼큐브 소고기 300g', productCost: '11800원' },
    { id: 2, productTitle: '강아지 간식 27종', option: '강아지 독 리얼큐브 소고기 500g', productCost: '20000원' },
    { id: 3, productTitle: '고양이 간식 27종', option: '강아지 츄르 5스틱g', productCost: '11000원' },
  ];

  console.log(products);
  return (
    <>
      <div className={styles.cart}>
        <div className={styles.totalCheckbox}>
          <input type="checkbox" name="totalCheck" />
          <div className={styles.totalNumber}>전체 {products.length}개</div>
        </div>
        {products?.map((product, index) => (
          <Card
            key={product.id}
            productTitle={product.productTitle}
            option={product.option}
            productCost={product.productCost}
          />
        ))}
      </div>
    </>
  );
}

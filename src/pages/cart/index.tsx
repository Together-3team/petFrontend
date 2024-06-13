import { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import Card from '@/components/cart/Card';
import TotalPay from '@/components/cart/TotalPay';
import Button from '@/components/common/Button';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import exampleProductImg from '@/assets/exampleProductImg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { httpClient } from '@/apis/httpClient';

interface Product {
  id: number;
  productTitle: string;
  option: string;
  productCost: number;
  originalCost: number;
  productNumber: number;
  imageUrl: string;
  isChecked: boolean;
}

export default function Cart() {
  // 더미 데이터
  // const initialProducts = [
  //   {
  //     id: 1,
  //     productTitle: '강아지 간식 27종',
  //     option: '강아지 독 리얼큐브 소고기 300g',
  //     productCost: 10000, // 판매가
  //     originalCost: 11800, // 원가
  //     productNumber: 2,
  //     imageUrl: exampleProductImg,
  //   },
  //   {
  //     id: 2,
  //     productTitle: '강아지 간식 27종',
  //     option: '강아지 독 리얼큐브 소고기 500g',
  //     productCost: 15000,
  //     originalCost: 20000,
  //     productNumber: 3,
  //     imageUrl: exampleProductImg,
  //   },
  //   {
  //     id: 3,
  //     productTitle: '고양이 간식 27종',
  //     option: '강아지 츄르 5스틱g',
  //     productCost: 10000,
  //     originalCost: 11000,
  //     productNumber: 10,
  //     imageUrl: exampleProductImg,
  //   },
  //   {
  //     id: 4,
  //     productTitle: '고양이 간식 27종',
  //     option: '강아지 츄르 5스틱g',
  //     productCost: 10000,
  //     originalCost: 11000,
  //     productNumber: 10,
  //     imageUrl: exampleProductImg,
  //   },
  // ];

  // 상품목록 없는 경우 더미데이터
  // const initialProducts: {
  //   id: number;
  //   productTitle: string;
  //   option: string;
  //   productCost: number;
  //   productNumber: number;
  // }[] = [];

  // const [products, setProducts] = useState(initialProducts.map(product => ({ ...product, isChecked: true })));
  const [products, setProducts] = useState<Product[]>([]);
  const [selectAll, setSelectAll] = useState(true); // 전체 체크 상태

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await httpClient().get<
          {
            id: number;
            user: string;
            optionCombination: {
              product: {
                originalCost: number;
                productCost: number;
                imageUrl: string; // 백엔드에서 이미지 URL도 함께 제공한다고 가정합니다.
                productTitle: string; // 백엔드에서 제품 제목도 함께 제공한다고 가정합니다.
              };
              option: string;
            };
            quantity: number;
            status: number;
            createdAt: string;
          }[]
        >('/selected-products/carts'); // 백엔드의 실제 엔드포인트로 변경해야 합니다.

        console.log(response);

        const productsData = response.map(item => ({
          id: item.id,
          productTitle: item.optionCombination.product.productTitle,
          option: item.optionCombination.option,
          productCost: item.optionCombination.product.productCost,
          originalCost: item.optionCombination.product.originalCost,
          productNumber: item.quantity,
          imageUrl: item.optionCombination.product.imageUrl,
          isChecked: true,
        }));

        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    fetchProducts();
  }, []);

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

  // 수량 변경 시 제품 수량 업데이트
  function handleProductQuantityChange(id: number, newQuantity: number) {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, productNumber: newQuantity } : product
    );

    setProducts(updatedProducts);
  }

  // 선택한 제품의 총 원가 게산
  function calculateTotalOriginalPrice() {
    return products
      .filter(product => product.isChecked)
      .reduce((total, product) => {
        return total + product.originalCost * product.productNumber;
      }, 0);
  }

  // 선택한 제품의 총 가격 계산
  function calculateTotalPrice() {
    return products
      .filter(product => product.isChecked)
      .reduce((total, product) => {
        return total + product.productCost * product.productNumber;
      }, 0);
  }

  // 제품 삭제
  function handleProductRemove(id: number) {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = calculateTotalPrice();
  const productCount = products.filter(product => product.isChecked).length; // 전체 상품 수

  return (
    <>
      <div className={styles.cart}>
        {products.length > 0 ? (
          <>
            <div className={styles.totalCheckboxContainer}>
              <div className={styles.totalCheckbox}>
                <input
                  type="checkbox"
                  name="totalCheck"
                  checked={selectAll}
                  className={styles.checkbox}
                  onChange={handleSelectAll}
                />
                <div className={styles.totalNumber}>전체 {products.length}개</div>
              </div>
              <FontAwesomeIcon icon={faTrash} className={styles.faTrash} />
            </div>
            {products.map((product, index) => (
              <Card
                key={product.id}
                productTitle={product.productTitle}
                option={product.option}
                productCost={product.productCost}
                originalCost={product.originalCost}
                isChecked={product.isChecked}
                productNumber={product.productNumber}
                imageUrl={product.imageUrl}
                onCheck={() => handleProductCheck(product.id)}
                onQuantityChange={(newQuantity: number) => handleProductQuantityChange(product.id, newQuantity)}
                onRemove={() => handleProductRemove(product.id)}
              />
            ))}
            <TotalPay totalPrice={totalPrice} totalOriginalPrice={totalOriginalPrice} productCount={productCount} />
          </>
        ) : (
          <div className={styles.noProduct}>아직 담은 상품이 없어요</div>
        )}
      </div>
      <FloatingBox className={styles.bottomNavCart}>
        <Button size="large" backgroundColor="$color-pink-main">
          {totalPrice}원 주문하기
        </Button>
        <div className={styles.howMuchMinus}>
          지금 구매하면 <span className={styles.pink}>-{totalOriginalPrice - totalPrice}원&nbsp;</span>할인돼요
        </div>
      </FloatingBox>
    </>
  );
}

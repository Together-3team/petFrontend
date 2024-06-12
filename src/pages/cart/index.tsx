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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectAll, setSelectAll] = useState(true); // 전체 체크 상태

  const queryClient = useQueryClient();

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const response = await httpClient().get<
          {
            id: number;
            optionCombination: {
              product: {
                originalCost: number;
                price: number;
                title: string;
                thumNailImage: string;
              };
              optionCombination: string;
              combinationName: string;
              combinationPrice: number;
              stock: number;
            };
            quantity: number;
          }[]
        >('/selected-products/carts');
        console.log(response);
        return response.map(item => ({
          id: item.id,
          productTitle: item.optionCombination.product.title,
          option: item.optionCombination.optionCombination,
          productCost: item.optionCombination.product.price,
          originalCost: item.optionCombination.product.originalCost,
          productNumber: item.quantity,
          imageUrl: item.optionCombination.product.thumNailImage,
          isChecked: true,
        }));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
      }
    },
  });

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

  // useMutation: 낙관적 업데이트 (서버 통신 여부와 관계없이 UI 업뎃)
  const mutation = useMutation({
    mutationKey: ['updateProductQuantity'],
    mutationFn: async ({ id, newQuantity }: { id: number; newQuantity: number }) => {
      try {
        // 서버에 수량 업데이트 요청
        await httpClient().put(`/selected-products/carts/${id}`, { quantity: newQuantity });
      } catch (error) {
        console.error('Failed to update product quantity:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // 성공적으로 업데이트되면 해당 쿼리를 다시 불러옴
      (queryClient as any).invalidateQueries('products');
    },
  });

  // 수량 변경 시 제품 수량 업데이트
  function handleProductQuantityChange(id: number, newQuantity: number) {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, productNumber: newQuantity } : product
    );

    setProducts(updatedProducts);
    // 서버에 수량 업뎃 요청
    mutation.mutate({ id, newQuantity });
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
    setProducts(prev => prev.filter(product => product.id !== id));
  }

  // 버튼 클릭
  function handleOrderButtonClick() {
    sessionStorage.setItem('cartData', JSON.stringify(products));
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
        <Button size="large" backgroundColor="$color-pink-main" onClick={handleOrderButtonClick}>
          {totalPrice}원 주문하기
        </Button>
        <div className={styles.howMuchMinus}>
          지금 구매하면 <span className={styles.pink}>-{totalOriginalPrice - totalPrice}원&nbsp;</span>할인돼요
        </div>
      </FloatingBox>
    </>
  );
}

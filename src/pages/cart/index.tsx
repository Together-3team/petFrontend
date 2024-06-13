import { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import Card from '@/components/cart/Card';
import TotalPay from '@/components/cart/TotalPay';
import Button from '@/components/common/Button';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { httpClient } from '@/apis/httpClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAllProducts, deleteProductById, fetchCartProducts, updateProductQuantity } from '@/apis/cartApi';

export interface Product {
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
  const [selectAll, setSelectAll] = useState(true);
  const queryClient = useQueryClient();

  // 상품 목록 GET
  const { data: productsData, refetch: refetchProducts } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartProducts,
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
    }
  }, [productsData]);

  // 상품 전체 DELETE
  async function handleDeleteAllProducts() {
    try {
      await httpClient().delete('/selected-products/orders');
      console.log('Products all deleted successfully');
    } catch (error) {
      console.error('Failed to delete all products:', error);
      throw error;
    }
  }

  // 상품 선택 DELETE
  async function deleteProduct(id: number) {
    try {
      await deleteProductById(id);
      refetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }

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
        await updateProductQuantity(id, newQuantity);
      } catch (error) {
        console.log('Failed to update product quantity:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // 성공적으로 업데이트되면 해당 쿼리를 다시 불러옴
      (queryClient as any).invalidateQueries('cart');
    },
    onError: (error, variables, context) => {
      console.error('Mutation error: ', error);
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

  // 제품 삭제 (선택 삭제)
  function handleProductRemove(id: number) {
    deleteProduct(id);
  }

  // 버튼 클릭
  function handleOrderButtonClick() {
    sessionStorage.setItem('cartData', JSON.stringify(products));
    console.log('Cart data saved to sessionStorage:', products);
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
              <FontAwesomeIcon icon={faTrash} className={styles.faTrash} onClick={handleDeleteAllProducts} />
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

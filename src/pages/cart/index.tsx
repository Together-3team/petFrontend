import { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import Card from '@/components/cart/Card';
import TotalPay from '@/components/cart/TotalPay';
import Button from '@/components/common/Button';
import BackButton from '@/components/common/Button/BackButton';
import BottomModal from '@/components/common/Modal/Base/BottomModal';
import FloatingBox from '@/components/common/Layout/Footer/FloatingBox';
import useToast from '@/hooks/useToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAllProducts, deleteProductById, fetchCartProducts, updateProductQuantity } from '@/apis/cartApi';
import Header from '@/components/common/Layout/Header';
import { useRouter } from 'next/router';
import CardSliderRecommended from '@/components/common/Card/CardSlider/Recommended';

export interface Product {
  id: number;
  productTitle: string;
  option: string;
  productCost: number;
  originalCost: number;
  combinationPrice: number;
  productNumber: number;
  imageUrl: string;
  isChecked: boolean;
}

export default function Cart() {
  const BOTTOM_BOX_ID = 'bottomBox';
  const [products, setProducts] = useState<Product[]>([]);
  const [selectAll, setSelectAll] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ type: 'individual' | 'bulk'; id?: number } | null>(null);
  const queryClient = useQueryClient();
  const { showToast } = useToast(BOTTOM_BOX_ID);
  const router = useRouter();

  // 상품 목록 GET
  const { data: productsData, refetch: refetchProducts } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCartProducts,
  });

  useEffect(() => {
    if (productsData) {
      setProducts(
        productsData.map(product => ({
          ...product,
          isChecked: products.find(p => p.id === product.id)?.isChecked ?? product.isChecked,
        }))
      );
    }
  }, [productsData]);

  // 상품 전체 DELETE
  async function handleDeleteAllProducts() {
    try {
      // 모달 열기
      setModalContent({
        type: 'bulk',
      });
      setIsModalOpen(true);
    } catch (error) {
      console.error('Failed to delete all products:', error);
    }
  }

  // 상품 선택 DELETE
  async function handleProductRemove(id: number) {
    try {
      await deleteProductById(id);
      showToast({
        status: 'success',
        message: '상품이 삭제되었습니다',
      });
      setIsModalOpen(false); // 삭제 성공 후 모달 닫기
      refetchProducts(); // 제품 목록 다시 불러오기
    } catch (error) {
      console.error('Failed to delete product:', error);
      showToast({
        status: 'error',
        message: '상품 삭제에 실패했습니다',
      });
    }
  }

  // 모달에서 삭제 버튼 클릭 시 (개별 삭제)
  function handleModalDeleteButtonClick() {
    if (modalContent?.type === 'individual' && modalContent.id !== undefined) {
      handleProductRemove(modalContent.id);
    }
  }

  // 모달에서 전체 삭제 버튼 클릭 시
  function handleModalBulkDeleteButtonClick() {
    try {
      deleteAllProducts();
      showToast({
        status: 'success',
        message: '모든 상품이 삭제되었습니다',
      });
      setIsModalOpen(false); // 모달 닫기
      setProducts([]); // 상품 목록 초기화
    } catch (error) {
      console.error('Failed to delete all products:', error);
      showToast({
        status: 'error',
        message: '상품 삭제에 실패했습니다',
      });
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
    // 서버에 수량 업데이트 요청
    mutation.mutate({ id, newQuantity });
  }

  // 선택한 제품의 총 원가 게산
  function calculateTotalOriginalPrice() {
    return products
      .filter(product => product.isChecked)
      .reduce((total, product) => {
        return total + product.originalCost * product.productNumber + product.combinationPrice * product.productNumber;
      }, 0);
  }

  // 선택한 제품의 총 가격 계산
  function calculateTotalPrice() {
    return products
      .filter(product => product.isChecked)
      .reduce((total, product) => {
        return total + product.productCost * product.productNumber + product.combinationPrice * product.productNumber;
      }, 0);
  }

  // 버튼 클릭 (주문하기)
  function handleOrderButtonClick() {
    const selectedProducts = products.filter(product => product.isChecked);
    sessionStorage.setItem('cartData', JSON.stringify(selectedProducts));
    console.log('Cart data saved to sessionStorage:', selectedProducts);
    router.push('/payment');
  }

  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalPrice = calculateTotalPrice();
  const productCount = products.filter(product => product.isChecked).length; // 전체 상품 수

  return (
    <>
      <Header.Root className={styles.headerRoot}>
        <Header.Box>
          <Header.Left>
            <BackButton />
          </Header.Left>
          <Header.Center className={styles.headerName}>장바구니</Header.Center>
        </Header.Box>
      </Header.Root>
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
                onRemove={() => {
                  setModalContent({
                    type: 'individual',
                    id: product.id,
                  });
                  setIsModalOpen(true);
                }}
              />
            ))}
            <TotalPay
              totalPrice={totalPrice}
              title={`결제 상품 총 ${products.length}개`}
              totalOriginalPrice={totalOriginalPrice}
              productCount={productCount}
            />
          </>
        ) : (
          <div className={styles.noProduct}>아직 담은 상품이 없어요</div>
        )}
      </div>
      <div className={styles.rectangle}></div>
      <div className={styles.recommended}>
        <CardSliderRecommended title="이 상품은 어떠세요?" />
      </div>

      <FloatingBox id={BOTTOM_BOX_ID}>
        <div className={styles.bottomNavCart}>
          <Button
            size="large"
            backgroundColor="$color-pink-main"
            onClick={handleOrderButtonClick}
            disabled={totalPrice === 0}>
            {totalPrice}원 주문하기
          </Button>
          <div className={styles.howMuchMinus}>
            지금 구매하면 <span className={styles.pink}>-{totalOriginalPrice - totalPrice}원&nbsp;</span>할인돼요
          </div>
        </div>
      </FloatingBox>
      <BottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} hasBackdrop={true}>
        <div className={styles.modalContent}>
          {modalContent?.type === 'individual' && (
            <>
              <div className={styles.oneMore}>정말로 이 상품을 삭제하시겠습니까?</div>
              <div className={styles.buttonBox}>
                <Button size="medium" backgroundColor="$color-white" onClick={() => setIsModalOpen(false)}>
                  취소
                </Button>
                <Button size="medium" backgroundColor="$color-gray-800" onClick={handleModalDeleteButtonClick}>
                  삭제
                </Button>
              </div>
            </>
          )}
          {modalContent?.type === 'bulk' && (
            <>
              <div className={styles.oneMore}>정말로 모든 상품을 삭제하시겠습니까?</div>
              <div className={styles.buttonBox}>
                <Button size="medium" backgroundColor="$color-white" onClick={() => setIsModalOpen(false)}>
                  취소
                </Button>
                <Button size="medium" backgroundColor="$color-gray-800" onClick={handleModalBulkDeleteButtonClick}>
                  삭제
                </Button>
              </div>
            </>
          )}
        </div>
      </BottomModal>
    </>
  );
}

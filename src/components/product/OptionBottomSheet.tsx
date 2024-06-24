import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import Image from 'next/image';

import BottomSheet from '../common/Modal/Base/BottomSheet';
import { httpClient } from '@/apis/httpClient';
import { ProductDropdown } from '../common/ProductDropdown';
import arrow from '@/assets/images/arrow-down.jpg';
import NumberInput from './NumberInput';
import Button from '../common/Button';
import { queryClient } from '@/utils/queryClient';
import { ToastParameters } from '@/types/components/toast';
import { Product as QueryProduct } from '@/types/apis/product';
import { Product as ProductType } from '@/types/product';
import X from '@/assets/svgs/btn-x.svg';
import styles from './OptionBottomSheet.module.scss';
import { cartQueries } from '@/apis/cart/queries';
import { useQuery } from '@tanstack/react-query';

const cx = classNames.bind(styles);

interface Option {
  id: number;
  optionValue: string;
  optionPrice: number;
}

interface Product {
  id: number;
  originalPrice: number;
  price: number;
  title: string;
  thumbNailImage: string;
}

interface OptionCombination {
  id: number;
  product: Product;
  optionCombination: string;
  combinationName: string;
  combinationPrice: number;
  amount: number;
}

interface Review {
  id: number;
  rating: number;
  reviewImages: string;
  description: string;
}

interface ResponseData {
  id: number;
  originalPrice: number;
  price: number;
  title: string;
  thumbNailImage: string;
  petType: number;
  productType: number;
  averageRating: number;
  reviewCount: number;
  totalAmount: number;
  isZzimed: boolean;
  options: { [key: string]: Option[] };
  optionCombinations: OptionCombination[];
  reviews: Review[];
}

interface OrdersProduct {
  thumbNailImage: string;
  title: string;
  originalPrice: number;
  price: number;
}

interface OrdersOptionCombination {
  id: number;
  optionCombination: string;
  combinationPrice: number;
  combinationName: string;
  amount: number;
  product: OrdersProduct;
}

interface OrdersResponseData {
  quantity: number;
  optionCombination: OrdersOptionCombination;
  id: number;
}

export interface PostOrdersResponseData {
  quantity: number;
  optionCombination: {
    id: number;
    optionCombination: string;
    combinationPrice: number;
    combinationName: string;
    amount: number;
    product: Product;
  };
  id: number;
}

export interface PostItem {
  optionCombinationId: number;
  quantity: number;
}

interface OptionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
  type: 'cartPurchase' | 'purchaseOnly';
  showToast: (toast: ToastParameters) => void;
  groupBuyingId?: number;
}

export default function OptionBottomSheet({
  isOpen,
  onClose,
  product,
  type,
  showToast,
  groupBuyingId,
}: OptionBottomSheetProps) {
  const [productOptions, setProductOptions] = useState<Option[][]>([]);
  const [productOptionsOn, setProductOptionsOn] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptionsObject, setSelectedOptionsObject] = useState<{ [key: string]: number }>({});
  const [optionCombinations, setOptionCombinations] = useState<OptionCombination[]>([]);
  // const [selectedCombinationName, setSelectedCombinationName] = useState('');
  // const [combinationPrice, setCombinationPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [placeholderList, setPlaceholderList] = useState<string[]>([]);
  const [price, setPrice] = useState(0);
  const [totalAmountOfOptions, setTotalAmountOfOptions] = useState(0);
  const [totalPriceOfOptions, setTotalPriceOfOptions] = useState(0);
  const [totalOriginalPriceOfOptions, setTotalOriginalPriceOfOptions] = useState(0);
  const [countChanged, setCountChanged] = useState(false);
  const [dropdownOn, setDropdownOn] = useState(Array.from({ length: productOptions.length }, (v, i) => i === 0));
  const [ordersIdObject, setOrdersIdObject] = useState<{ [key: string]: number }>({});
  const [countWithNoOption, setCountWithNoOption] = useState(1);
  const router = useRouter();
  const [loadingState, setLoadingState] = useState(0);

  useEffect(() => {
    const fetchProductOption = async () => {
      try {
        const response = await httpClient().get<ResponseData>(`products/detail/${product.id}`);
        const optionsArray = Object.values(response.options);
        setPlaceholderList(Object.keys(response.options));
        setProductOptions(optionsArray);
        setOptionCombinations(response.optionCombinations);
        setSelectedOptions(new Array(optionsArray.length).fill(''));
        setOriginalPrice(response.originalPrice);
        setPrice(response.price);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingState(1);
      }
    };

    fetchProductOption();
  }, [product?.id]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await httpClient().get<OrdersResponseData[]>('selected-products/orders');
        for (let combo of response) {
          setSelectedOptionsObject(prev => ({ [combo.optionCombination.id]: combo.quantity, ...prev }));
          setSelectedOptions(combo.optionCombination.optionCombination.split(','));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  const formatOptions = (data: { id: number; optionValue: string }[]) => {
    return data.map(item => ({
      value: String(item.id),
      label: item.optionValue,
    }));
  };

  const handleProductOptionsOn = () => {
    setProductOptionsOn(true);
    // productOptions가 업데이트될 때마다 dropdownOn을 다시 설정
    const initialDropdownOn = Array.from({ length: productOptions.length }, (v, i) => i === 0);
    setDropdownOn(initialDropdownOn);
    setCountChanged(false);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
    // calculateCombinationPriceAndName(newSelectedOptions);
  };

  const calculateCombinationPriceAndName = useCallback(
    (selectedOptions: string[]) => {
      const selectedIds = selectedOptions.filter(Boolean).sort().join(',');
      const combination = optionCombinations.find(
        (combo: { optionCombination: string }) => combo.optionCombination === selectedIds
      );
      return {
        selectedIds,
        combinationId: combination ? combination.id : 0,
        combinationPrice: combination ? combination.combinationPrice : 0,
        selectedCombinationName: combination ? combination.combinationName : '',
      };
    },
    [optionCombinations]
  );

  const handleXButtonClick = async (objectKey: string) => {
    try {
      await httpClient().delete(`selected-products/${ordersIdObject[objectKey]}`);
    } catch (err) {
      console.log(err);
    }
    setSelectedOptionsObject(prev => {
      const { [objectKey]: _, ...newObject } = prev;
      return newObject;
    });
  };

  const handleBuyButtonClick = async () => {
    let productList: QueryProduct[] = [];
    // {'1,2': 4, '2,4':5}
    for (let key of Object.keys(selectedOptionsObject)) {
      const selectedIds = key.split(',');
      const { combinationPrice, selectedCombinationName } = calculateCombinationPriceAndName(selectedIds);
      const buyProduct: QueryProduct = {
        id: product.id,
        productTitle: product.title,
        option: selectedCombinationName,
        productCost: product.price,
        originalCost: product.originalPrice,
        combinationPrice: combinationPrice,
        productNumber: selectedOptionsObject[key],
        imageUrl: product.thumbNailImage,
        selectedProductId: ordersIdObject[key],
        ...(groupBuyingId && { groupBuyingId: groupBuyingId }),
      };
      console.log(ordersIdObject);
      productList.unshift(buyProduct);
    }
    queryClient.setQueryData(['cartData'], productList);
    const response = queryClient.getQueryData(['cartData']);

    console.log(productList);
    router.push('/payment');
  };

  const handleCartButtonClick = async () => {
    try {
      // const response = await httpClient().get('selected-products/orders');
      await httpClient().put('selected-products/orders-to-carts');
      // const res = await httpClient().get('selected-products/carts');
      await httpClient().delete('selected-products/orders');
    } catch (err) {
      console.log(err);
    } finally {
      cartQueries.invalidateQueries();
    }
    setSelectedOptionsObject({});
    setCountChanged(false);
  };

  useEffect(() => {
    const handleSelectedOptionsObject = async () => {
      const { selectedIds, combinationId } = calculateCombinationPriceAndName(selectedOptions);
      if (
        (selectedOptions.every(option => option !== '') && selectedIds !== '') ||
        (countChanged === true && selectedIds !== '')
      ) {
        if (selectedOptionsObject[selectedIds] !== undefined) {
          setSelectedOptionsObject(prev => ({
            ...prev,
            [selectedIds]: prev[selectedIds] + 1,
          }));
        } else {
          setSelectedOptionsObject(prev => ({ ...prev, [selectedIds]: 1 }));
        }
        setProductOptionsOn(false);
        setSelectedOptions(new Array(productOptions.length).fill(''));
        setCountChanged(false);
        if (combinationId === 0) return;
        const postItem = {
          optionCombinationId: combinationId,
          quantity: 1,
        };
        const response = await httpClient().post<PostOrdersResponseData, PostItem>(
          'selected-products/orders',
          postItem
        );
        // '1,2':451
        setOrdersIdObject(prev => ({ ...prev, [selectedIds]: response.id }));
        console.log(response);
      }
    };

    handleSelectedOptionsObject();
  }, [selectedOptions, productOptions.length, selectedOptionsObject, calculateCombinationPriceAndName, countChanged]);

  useEffect(() => {
    if (isOpen) {
      if (Object.keys(selectedOptionsObject).length !== 0) {
        setProductOptionsOn(false);
        return;
      }
      if (productOptions.length < 2 && loadingState === 1) {
        setProductOptionsOn(false);
        return;
      }
      setProductOptionsOn(true);
    }
  }, [isOpen, selectedOptionsObject, productOptions, loadingState]);

  useEffect(() => {
    let totalAmountOfOptions = 0;
    let totalPriceOfOptions = 0;
    let totalOriginalPriceOfOptions = 0;
    if (productOptions.length > 1) {
      for (const key of Object.keys(selectedOptionsObject)) {
        const selectedIds = key.split(',');
        const { combinationPrice } = calculateCombinationPriceAndName(selectedIds);
        totalAmountOfOptions += Number(selectedOptionsObject[key]);
        totalPriceOfOptions += (combinationPrice + price) * Number(selectedOptionsObject[key]);
        totalOriginalPriceOfOptions += (combinationPrice + originalPrice) * Number(selectedOptionsObject[key]);
      }

      setTotalAmountOfOptions(totalAmountOfOptions);
      setTotalPriceOfOptions(totalPriceOfOptions);
      setTotalOriginalPriceOfOptions(totalOriginalPriceOfOptions);
    }
    if (productOptions.length < 2) {
      setTotalAmountOfOptions(countWithNoOption);
      setTotalPriceOfOptions(price * countWithNoOption);
      setTotalOriginalPriceOfOptions(originalPrice * countWithNoOption);
    }
  }, [
    selectedOptionsObject,
    calculateCombinationPriceAndName,
    price,
    originalPrice,
    productOptions,
    ordersIdObject,
    countWithNoOption,
  ]);

  //페이지에서 벗어나면 selectedOptionsObject 초기화
  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     setSelectedOptionsObject({});
  //     setCountChanged(false);
  //     setProductOptionsOn(true);
  //     try {
  //       await httpClient().delete('selected-products/orders');
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [router.events]);

  useEffect(() => {
    // productOptions가 업데이트될 때마다 dropdownOn을 다시 설정
    const initialDropdownOn = Array.from({ length: productOptions.length }, (v, i) => i === 0);
    setDropdownOn(initialDropdownOn);
  }, [productOptions]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {productOptionsOn ? (
        <div className={cx('productOptions')}>
          {productOptions.map((options, index) => (
            <ProductDropdown
              key={index}
              index={index}
              dropdownOn={dropdownOn}
              setDropdownOn={setDropdownOn}
              data={formatOptions(options)}
              placeholder={`${placeholderList[index]}`}
              onClick={(value: string) => handleOptionChange(index, value)}
            />
          ))}
        </div>
      ) : (
        <>
          {productOptions.length > 1 ? (
            <div className={cx('content')}>
              <div className={cx('selectOption')} onClick={handleProductOptionsOn}>
                <div>옵션 선택</div>
                <Image src={arrow.src} width="12" height="12" alt="아래를 가르키는 화살표 이미지" priority />
              </div>
              <div className={cx('chosenBoxes')}>
                {Object.keys(selectedOptionsObject).map((objectKey, i) => {
                  const selectedIds = objectKey.split(',');
                  const { combinationId, combinationPrice, selectedCombinationName } =
                    calculateCombinationPriceAndName(selectedIds);
                  return (
                    <div key={i} className={cx('chosenBox')}>
                      <div className={cx('boxLine1')}>
                        <div className={cx('selectedCombinationName')}> {selectedCombinationName} </div>
                        <button type="button" className={cx('xButton')} onClick={() => handleXButtonClick(objectKey)}>
                          <X />
                        </button>
                      </div>
                      <div className={cx('boxLine2')}>
                        <NumberInput
                          selectedOptionsObject={selectedOptionsObject}
                          setSelectedOptionsObject={setSelectedOptionsObject}
                          objectKey={objectKey}
                          setCountChanged={setCountChanged}
                          combinationId={combinationId}
                          ordersId={ordersIdObject[objectKey]}
                        />
                        <div className={cx('boxLine2-2')}>
                          <p className={cx('originalPrice')}>
                            {`${((originalPrice + combinationPrice) * selectedOptionsObject[objectKey]).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }).replace('₩', '')}`}
                            원
                          </p>
                          <p className={cx('discountRate')}>
                            {Math.ceil((1 - (price + combinationPrice) / (originalPrice + combinationPrice)) * 100)}%
                          </p>
                          <p className={cx('price')}>
                            {`${((price + combinationPrice) * selectedOptionsObject[objectKey]).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }).replace('₩', '')}`}
                            원
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={cx('divider')}></div>
              <div className={cx('summary')}>
                <div className={cx('amountAndPrice')}>
                  <p className={cx('amount')}>총 {totalAmountOfOptions}개 상품금액</p>
                  <p className={cx('originalTotalPrice')}>
                    정가{' '}
                    {totalOriginalPriceOfOptions
                      .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
                      .replace('₩', '')}
                  </p>
                </div>
                <p className={cx('totalPrice')}>
                  할인가{' '}
                  {totalPriceOfOptions.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }).replace('₩', '')}
                </p>
              </div>
            </div>
          ) : (
            <div className={cx('content')}>
              <div className={cx('chosenBox')}>
                <div className={cx('boxLine1')}>
                  <div className={cx('selectedCombinationName')}> 수량 선택 </div>
                </div>
                <div className={cx('boxLine2')}>
                  <NumberInput
                    selectedOptionsObject={selectedOptionsObject}
                    setSelectedOptionsObject={setSelectedOptionsObject}
                    setCountChanged={setCountChanged}
                    combinationId={optionCombinations[0]?.id}
                    setOrdersIdObject={setOrdersIdObject}
                    ordersIdObject={ordersIdObject}
                    objectKey={optionCombinations[0]?.optionCombination}
                    countWithNoOption={countWithNoOption}
                    setCountWithNoOption={setCountWithNoOption}
                  />
                  <div className={cx('boxLine2-2')}>
                    <p className={cx('originalPrice')}>
                      정가
                      {totalOriginalPriceOfOptions
                        .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
                        .replace('₩', '')}
                      원
                    </p>
                    <p className={cx('discountRate')}>
                      {' '}
                      {Math.ceil((1 - totalPriceOfOptions / totalOriginalPriceOfOptions) * 100)}%
                    </p>
                    <p className={cx('price')}>
                      할인가
                      {totalPriceOfOptions
                        .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
                        .replace('₩', '')}
                      원
                    </p>
                  </div>
                </div>
              </div>
              <div className={cx('divider')}></div>
              <div>
                <div className={cx('amountAndPrice')}>
                  <p className={cx('amount')}>
                    총{' '}
                    {totalAmountOfOptions
                      .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
                      .replace('₩', '')}
                    개 상품금액
                  </p>
                  <p className={cx('originalTotalPrice')}>
                    {`정가 ${totalOriginalPriceOfOptions
                      .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
                      .replace('₩', '')}원`}
                  </p>
                </div>
                <p className={cx('totalPrice')}>
                  {`할인가 ${totalPriceOfOptions.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }).replace('₩', '')}원`}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      {type !== 'cartPurchase' && !productOptionsOn && (
        <div className={cx('purchaseOnlyButton')}>
          <Button size="large" backgroundColor="$color-pink-main" onClick={handleBuyButtonClick}>
            바로구매
          </Button>
        </div>
      )}
      {type === 'cartPurchase' && !productOptionsOn && (
        <div className={cx('buttons')}>
          <div className={cx('button')}>
            <Button
              size="large"
              backgroundColor="$color-white-pink"
              onClick={() => {
                handleCartButtonClick();
                onClose();
                showToast({
                  status: 'success',
                  message: '장바구니에 담겼어요!',
                  linkMessage: '장바구니로 가기',
                  linkProps: {
                    href: '/cart',
                  },
                });
              }}>
              장바구니
            </Button>
          </div>
          <div className={cx('button')}>
            <Button size="large" backgroundColor="$color-pink-main" onClick={handleBuyButtonClick}>
              바로구매
            </Button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '../common/Modal/Base/BottomSheet';
import { httpClient } from '@/apis/httpClient';
import { ProductDropdown } from '../common/ProductDropdown';
import styles from './OptionBottomSheet.module.scss';
import Image from 'next/image';
import arrow from '@/assets/images/arrow-down.jpg';
import NumberInput from './NumberInput';

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

interface OptionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  type: string;
}

export default function OptionBottomSheet({ isOpen, onClose, productId, type }: OptionBottomSheetProps) {
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

  useEffect(() => {
    const fetchProductOption = async () => {
      try {
        const response = await httpClient().get<ResponseData>(`products/detail/${productId}`);
        const optionsArray = Object.values(response.options);
        setPlaceholderList(Object.keys(response.options));
        setProductOptions(optionsArray);
        setOptionCombinations(response.optionCombinations);
        setSelectedOptions(new Array(optionsArray.length).fill(''));
        setOriginalPrice(response.originalPrice);
        setPrice(response.price);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductOption();
  }, [productId]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await httpClient().get<OrdersResponseData[]>('selected-products/orders');
        for (let combo of response) {
          console.log(combo.optionCombination.optionCombination);
          setSelectedOptionsObject(prev => ({ ...prev, [combo.optionCombination.id]: combo.quantity }));
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

  useEffect(() => {
    const handleSelectedOptionsObject = async () => {
      const { selectedIds, combinationId } = calculateCombinationPriceAndName(selectedOptions);
      console.log('jjj', selectedIds);
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
        const postItem = {
          optionCombinationId: combinationId,
          quantity: 1,
        };
        await httpClient().post('selected-products/orders', JSON.stringify(postItem));
        setCountChanged(false);
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
      setProductOptionsOn(true);
    }
  }, [isOpen, selectedOptionsObject]);

  useEffect(() => {
    console.log(selectedOptionsObject);
  }, [selectedOptionsObject]);

  useEffect(() => {
    let totalAmountOfOptions = 0;
    let totalPriceOfOptions = 0;
    let totalOriginalPriceOfOptions = 0;

    for (const key of Object.keys(selectedOptionsObject)) {
      const selectedIds = key.split(',');
      const { combinationPrice } = calculateCombinationPriceAndName(selectedIds);
      totalAmountOfOptions += Number(selectedOptionsObject[key]);
      totalPriceOfOptions += combinationPrice + price;
      totalOriginalPriceOfOptions += combinationPrice + originalPrice;
    }
    setTotalAmountOfOptions(totalAmountOfOptions);
    setTotalPriceOfOptions(totalPriceOfOptions);
    setTotalOriginalPriceOfOptions(totalOriginalPriceOfOptions);
  }, [selectedOptionsObject, calculateCombinationPriceAndName, price, originalPrice]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      setSelectedOptionsObject({});
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const [dropdownOn, setDropdownOn] = useState(Array.from({ length: productOptions.length }, (v, i) => i === 0));
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
          <div className={cx('selectOption')} onClick={handleProductOptionsOn}>
            <div>옵션 선택</div>
            <Image src={arrow.src} width="12" height="12" alt="아래를 가르키는 화살표 이미지" priority />
          </div>
          <div>
            {Object.keys(selectedOptionsObject).map((objectKey, i) => {
              const selectedIds = objectKey.split(',');
              const { combinationPrice, selectedCombinationName } = calculateCombinationPriceAndName(selectedIds);
              return (
                <div key={i} className={cx('chosenBox')}>
                  <div className={cx('selectedCombinationName')}> {selectedCombinationName} </div>
                  <NumberInput
                    selectedOptionsObject={selectedOptionsObject}
                    setSelectedOptionsObject={setSelectedOptionsObject}
                    objectKey={objectKey}
                    setCountChanged={setCountChanged}
                  />
                  <div>
                    <p>정가 {`${originalPrice + combinationPrice}`}원</p>
                    <p>할인가 {`${price + combinationPrice}`}원</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div></div>
          <p>총 {totalAmountOfOptions}개 상품금액</p>
          <p>정가 {totalOriginalPriceOfOptions}</p>
          <p>할인가 {totalPriceOfOptions}</p>
        </>
      )}
    </BottomSheet>
  );
}

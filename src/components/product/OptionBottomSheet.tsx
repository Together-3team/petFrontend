import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '../common/Modal/Base/BottomSheet';
import { httpClient } from '@/apis/httpClient';
import { ProductDropdown } from '../common/ProductDropdown';
import styles from './OptionBottomSheet.module.scss';
import Image from 'next/image';
import arrow from '@/assets/images/arrow-down.jpg';

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
        combinationPrice: combination ? combination.combinationPrice : 0,
        selectedCombinationName: combination ? combination.combinationName : '',
      };
    },
    [optionCombinations]
  );

  useEffect(() => {
    const { selectedIds } = calculateCombinationPriceAndName(selectedOptions);
    if (selectedOptions.every(option => option !== '') && selectedIds !== '') {
      if (selectedOptionsObject[selectedIds] !== undefined) {
        console.log('p');
        setSelectedOptionsObject(prev => ({
          ...prev,
          [selectedIds]: prev[selectedIds] + 1,
        }));
      } else {
        setSelectedOptionsObject(prev => ({ ...prev, [selectedIds]: 1 }));
      }
      setProductOptionsOn(false);
      setSelectedOptions(new Array(productOptions.length).fill(''));
    }
  }, [selectedOptions, productOptions.length, selectedOptionsObject, calculateCombinationPriceAndName]);

  useEffect(() => {
    if (isOpen) {
      setProductOptionsOn(true);
      setSelectedOptionsObject({});
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(selectedOptionsObject);
  }, [selectedOptionsObject]);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {productOptionsOn ? (
        <div className={cx('productOptions')}>
          {productOptions.map((options, index) => (
            <ProductDropdown
              key={index}
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
          {Object.keys(selectedOptionsObject).map((objectKey, i) => {
            const selectedIds = objectKey.split(',');
            const { combinationPrice } = calculateCombinationPriceAndName(selectedIds);

            return (
              <div key={i}>
                <div> {objectKey} </div>
                <div>
                  <p>정가 {`${originalPrice + combinationPrice}`}원</p>
                  <p>할인가 {`${price + combinationPrice}`}원</p>
                </div>
                {selectedOptionsObject[objectKey]}개
              </div>
            );
          })}
        </>
      )}
    </BottomSheet>
  );
}

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import BottomSheet from '../common/Modal/Base/BottomSheet';
import { httpClient } from '@/apis/httpClient';
import { ProductDropdown } from '../common/ProductDropdown';
import styles from './OptionBottomSheet.module.scss';

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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [optionCombinations, setOptionCombinations] = useState<OptionCombination[]>([]);
  const [selectedCombinationName, setSelectedCombinationName] = useState('');
  const [combinationPrice, setCombinationPrice] = useState(0);
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

  const handleOptionChange = (index: number, value: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);
    calculateCombinationPriceAndName(newSelectedOptions);
  };

  const calculateCombinationPriceAndName = (selectedOptions: string[]) => {
    const selectedIds = selectedOptions.filter(Boolean).sort().join(',');
    const combination = optionCombinations.find(
      (combo: { optionCombination: string }) => combo.optionCombination === selectedIds
    );
    setCombinationPrice(combination ? combination.combinationPrice : 0);
    setSelectedCombinationName(combination ? combination.combinationName : ''); // 옵션 조합 이름 설정
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* {productOptions.map((options, index) => (
        <Dropdown
          key={index}
          size="large"
          options={formatOptions(options)}
          placeholder={`${placeholderList[index]}`}
          onClick={(value: string) => handleOptionChange(index, value)}
        />
      ))} */}
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
      {selectedOptions.every(option => option !== '') && <div> {selectedCombinationName} </div>}
      <div>
        <p>정가 {`${originalPrice + combinationPrice}`}원</p>
        <p>할인가 {`${price + combinationPrice}`}원</p>
      </div>
    </BottomSheet>
  );
}

import { useEffect, useState } from 'react';
import BottomSheet from '../common/Modal/Base/BottomSheet';
import Dropdown from '../common/Dropdown';
import { httpClient } from '@/apis/httpClient';

export default function OptionBottomSheet({ isOpen, onClose, productId }: any) {
  const [productOptions, setProductOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionCombinations, setOptionCombinations] = useState([]);
  const [selectedCombinationName, setSelectedCombinationName] = useState('');
  const [combinationPrice, setCombinationPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchProductOption = async () => {
      try {
        const response = await httpClient().get('products/detail/1');
        const optionsArray = Object.values(response.options);

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
  }, []);

  const formatOptions = (data: { id: number; optionValue: string }[]) => {
    return data.map(item => ({
      value: String(item.id),
      label: item.optionValue,
    }));
  };

  console.log(productOptions);
  console.log(optionCombinations);
  console.log(selectedOptions);

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
      {productOptions.map((options, index) => (
        <Dropdown
          key={index}
          size="large"
          options={formatOptions(options)}
          value={selectedOptions[index]}
          placeholder={`선택 ${index + 1}`}
          onClick={(value: string) => handleOptionChange(index, value)}
        />
      ))}
      {selectedOptions.every(option => option !== '') && <div> {selectedCombinationName} </div>}
      <div>
        <p>정가 {originalPrice}원</p>
        <p>할인가 {`${price + combinationPrice}`}원</p>
      </div>
    </BottomSheet>
  );
}

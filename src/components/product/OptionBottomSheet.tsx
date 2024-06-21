import { useEffect, useState } from 'react';
import BottomSheet from '../common/Modal/Base/BottomSheet';
import { httpClient } from '@/apis/httpClient';
import Dropdown from '../common/Dropdown';

export default function OptionBottomSheet({ isOpen, onClose, productId }: any) {
  const [productOption, setProductOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchProductOption = async () => {
      try {
        const response = await httpClient().get('products/detail/1');
        setProductOption(Object.values(response.options));
        console.log(Object.values(response.options));
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

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {productOption.map((options, index) => (
        <Dropdown
          key={index}
          size="large"
          options={formatOptions(options)}
          placeholder={`선택 ${index + 1}`}
          onClick={(value: string) => console.log(value)}
        />
      ))}
    </BottomSheet>
  );
}

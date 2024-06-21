import { useState } from 'react';

import styles from './ProductTypeButton.module.scss';
import PetFoodIcon from '@/assets/svgs/pet-food.svg';
import PetSnackIcon from '@/assets/svgs/pet-snack.svg';
import PetGoodsIcon from '@/assets/svgs/pet-goods.svg';
import { ProductType } from '@/types/components/productTypeButton';

const PRODUCT_TYPES = [
  { name: '사료', value: '1', isSelected: false, Icon: PetFoodIcon },
  { name: '간식', value: '2', isSelected: false, Icon: PetSnackIcon },
  { name: '용품', value: '3', isSelected: false, Icon: PetGoodsIcon },
];

interface ProductTypeButtonProps {
  initialProductType?: string;
  onClick: (petType: ProductType) => void;
}

export default function ProductTypeButton({
  initialProductType: initialProductValue,
  onClick,
}: ProductTypeButtonProps) {
  const initialProductTypes = PRODUCT_TYPES.map(productType => ({
    ...productType,
    isSelected: productType.value === initialProductValue,
  }));
  const [productTypes, setProductTypes] = useState(initialProductTypes);

  const handleClick = (selectedProductType: ProductType) => {
    const { name, value, isSelected } = selectedProductType;
    const nextPetTypes = productTypes.map(productType => ({
      ...productType,
      isSelected: productType.value === selectedProductType.value ? !productType.isSelected : false,
    }));
    setProductTypes(nextPetTypes);
    onClick({ name, value, isSelected: !isSelected });
  };

  return (
    <ul className={styles.list}>
      {productTypes.map((productType, index) => (
        <li key={index}>
          <button
            type="button"
            className={styles.button}
            data-selected={productType.isSelected}
            onClick={() => handleClick(productType)}>
            <productType.Icon />
            {productType.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

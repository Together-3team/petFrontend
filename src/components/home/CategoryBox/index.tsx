import PetTypeButton from '@/components/common/Button/PetType';
import ProductTypeButton from '@/components/common/Button/ProductType';

import styles from './CategoryBox.module.scss';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { PetType } from '@/types/components/petTypeButton';
import { ProductType } from '@/types/components/productTypeButton';

export default function CategoryBox() {
  const typeQueriesRef = useRef({
    petType: '0',
    productType: '0',
  });
  const router = useRouter();

  const handlePetTypeClick = (petType: PetType) => {
    typeQueriesRef.current = { ...typeQueriesRef.current, petType: petType.value };
  };

  const handleProductTypeClick = (productType: ProductType) => {
    typeQueriesRef.current = { ...typeQueriesRef.current, productType: productType.value };

    router.push({
      pathname: '/products/category',
      query: {
        ...typeQueriesRef.current,
      },
    });
  };

  return (
    <div className={styles.category}>
      <p className={styles.title}>카테고리</p>
      <PetTypeButton onClick={handlePetTypeClick} />
      <ProductTypeButton onClick={handleProductTypeClick} />
    </div>
  );
}

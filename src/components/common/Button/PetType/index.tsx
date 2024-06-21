import { useState } from 'react';

import styles from './PetTypeButton.module.scss';
import { PetType } from '@/types/components/petTypeButton';

const PET_TYPES: PetType[] = [
  { name: '전체', value: '0', isSelected: true },
  { name: '강아지', value: '1', isSelected: false },
  { name: '고양이', value: '2', isSelected: false },
];

interface PetTypeButtonProps {
  onClick: (petType: PetType) => void;
}

export default function PetTypeButton({ onClick }: PetTypeButtonProps) {
  const [petTypes, setPetTypes] = useState<PetType[]>(PET_TYPES);

  const handleClick = (selectedPetType: PetType) => {
    const nextPetTypes = petTypes.map(petType => ({ ...petType, isSelected: petType.value === selectedPetType.value }));
    setPetTypes(nextPetTypes);
    onClick({ ...selectedPetType, isSelected: true });
  };

  return (
    <ul className={styles.list}>
      {petTypes.map((petType, index) => (
        <li key={index} className={styles.item}>
          <button
            type="button"
            className={styles.button}
            data-selected={petType.isSelected}
            onClick={() => handleClick(petType)}>
            {petType.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

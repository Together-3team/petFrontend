import { useRef, useState } from 'react';

import styles from './PetToggleButton.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';

interface PetToggleButtonProps {
  initialPetType: string;
  onClick: (petType: PetType) => void;
}

const PET_TYPES = [
  { name: '전체', value: '0' },
  { name: '강아지', value: '1' },
  { name: '고양이', value: '2' },
];

interface PetType {
  name: string;
  value: string;
}

export default function PetToggleButton({ initialPetType: initialData, onClick }: PetToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const initialPetType = PET_TYPES.find(petType => petType.value === initialData) || PET_TYPES[0];
  const [activePetType, setActivePetType] = useState(initialPetType);

  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => setIsOpen(false));

  const handleClick = (petType: PetType) => {
    setActivePetType(petType);
    setIsOpen(false);
    onClick(petType);
  };

  return (
    <div className={styles.container} ref={containerRef} data-isopen={isOpen}>
      {isOpen && (
        <ul className={styles.categories}>
          {PET_TYPES.map(petType => {
            if (petType.value === activePetType.value) {
              return;
            }
            return (
              <li key={petType.name}>
                <button type="button" className={styles.category} onClick={() => handleClick(petType)}>
                  {petType.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" className={styles.toggler} onClick={() => setIsOpen(prev => !prev)}>
        {activePetType.name}
      </button>
    </div>
  );
}

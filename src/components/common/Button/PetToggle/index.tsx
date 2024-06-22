import { MouseEvent, useRef, useState } from 'react';

import styles from './PetToggleButton.module.scss';
import useOutsideClick from '@/hooks/useOutsideClick';

interface PetToggleButtonProps {
  categories: string[];
  initialActiveCategory: string;
  onClick: (category: string) => void;
}

export default function PetToggleButton({ categories, initialActiveCategory, onClick }: PetToggleButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueCategories = Array.from(new Set([...categories, initialActiveCategory]));
  const [activeCategory, setActiveCategory] = useState(initialActiveCategory);

  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => setIsOpen(false));

  const handleClick = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLButtonElement) || !e.target.dataset.category) {
      return;
    }

    const nextCategory = e.target.dataset.category;
    setActiveCategory(nextCategory);
    setIsOpen(false);
    onClick(nextCategory);
  };

  return (
    <div className={styles.container} ref={containerRef} data-isopen={isOpen}>
      {isOpen && (
        <ul className={styles.categories} onClick={handleClick}>
          {uniqueCategories.map(category => {
            if (category === activeCategory) {
              return;
            }
            return (
              <li key={category}>
                <button type="button" className={styles.category} data-category={category}>
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button type="button" className={styles.toggler} onClick={() => setIsOpen(prev => !prev)}>
        {activeCategory}
      </button>
    </div>
  );
}

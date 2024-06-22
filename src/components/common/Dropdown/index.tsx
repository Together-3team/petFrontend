import React, { useState } from 'react';
import Select from 'react-select';
import styles from './Dropdown.module.scss';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  placeholder?: string;
  size: 'large' | 'small';
  onClick: (value: any) => void;
  // value: any;
}

export default function Dropdown({ size, options, placeholder, onClick }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const sizeClass = styles[size];

  const handleChange = (option: Option | null) => {
    setSelectedOption(option);
    onClick(option?.value);
  };

  return (
    <>
      <Select
        className={`${styles.dropdown} ${sizeClass}`}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder || '옵션'}
        styles={{ menu: () => ({ position: 'relative' }) }}
      />
    </>
  );
}

import { useState } from 'react';
import Image from 'next/image';
import DropDownItem from './DropDownItem';
import { UseFormRegisterReturn } from 'react-hook-form';
import arrow from '@/assets/images/arrow-down.jpg';
import styles from './Dropdown.module.scss';

type TData = {
  value: string;
  label: string;
};

type TIsSelect = {
  isClick: boolean;
} & TData;

type TDropdownProps = {
  data: TData[];
  register?: UseFormRegisterReturn;
  setValue?: any;
  placeholder: string;
  onClick: (value: any) => void;
  index: number;
  dropdownOn: boolean[];
  setDropdownOn: React.Dispatch<React.SetStateAction<boolean[]>>;
};

export function ProductDropdown({
  placeholder,
  data,
  index,
  dropdownOn,
  setDropdownOn,
  register,
  setValue,
  onClick,
}: TDropdownProps) {
  const [isSelectData, setIsSelectData] = useState<TIsSelect>({
    isClick: false,
    value: '',
    label: '',
  });

  const handleDropdownOn = (e: any): void => {
    e.stopPropagation();
    setDropdownOn(prev => {
      const updatedDropdownOn = [...prev];
      updatedDropdownOn[index] = true;
      return updatedDropdownOn;
    });
  };

  const handleItemClick = (data: any, index: number): void => {
    const value = data.value;
    setIsSelectData({
      isClick: true,
      value,
      label: data.label,
    });
    onClick(data?.value);
    setDropdownOn(prev => {
      const updatedDropdownOn = [...prev];
      updatedDropdownOn[index] = false;
      updatedDropdownOn[index + 1] = true;
      return updatedDropdownOn;
    });
  };

  return (
    <div className={styles.productDropdown}>
      <div className={`${styles.initial}`}>
        <input type="hidden" {...register} />
        <div onClick={e => handleDropdownOn(e)} className={styles.dropdownOn}>
          {isSelectData.isClick ? <DropDownItem data={isSelectData} /> : <DropDownItem data={{ label: placeholder }} />}
          <Image src={arrow.src} width="12" height="12" alt="아래를 가르키는 화살표 이미지" priority />
        </div>
      </div>
      {dropdownOn[index] && (
        <ul className={dropdownOn[index] ? styles.dropdown : styles.hidden}>
          {data.map((option, i) => (
            <li key={i} className={styles.list} onClick={() => handleItemClick(option, index)}>
              <DropDownItem data={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

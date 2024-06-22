import Image from 'next/image';
import styles from './Dropdown.module.scss';
import { useEffect, useState, useId } from 'react';
import DropDownItem from './DropDownItem';
import { UseFormRegisterReturn } from 'react-hook-form';
import arrow from '@/assets/images/arrow-down.jpg';

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
};

export function ProductDropdown({ placeholder, data, register, setValue, onClick }: TDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSelectData, setIsSelectData] = useState<TIsSelect>({
    isClick: false,
    value: '',
    label: '',
  });
  const uniqueId = useId();
  // useEffect(() => {
  //   document.addEventListener('click', handleDropdownClick);

  //   return () => {
  //     document.removeEventListener('click', handleDropdownClick);
  //   };
  // }, []);

  const handleDropdownClick = (e: any): void => {
    e.stopPropagation();
    // const target = e.target as HTMLElement;
    // const datasetState = target.dataset.state;
    // if (datasetState === `Dropdown${uniqueId}`) {
    //   setIsOpen(prev => !prev);
    //   return;
    // }
    // setIsOpen(false);
    setIsOpen(prev => !prev);
  };

  const handleDropdownOn = (e: any): void => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleItemClick = (data: any): void => {
    const value = data.value;
    setIsSelectData({
      isClick: true,
      value,
      label: data.label,
    });
    onClick(data?.value);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`${styles.initial}`}>
        <input type="hidden" {...register} />
        <div onClick={e => handleDropdownOn(e)} className={styles.dropdownOn}>
          {isSelectData.isClick ? <DropDownItem data={isSelectData} /> : <DropDownItem data={{ label: placeholder }} />}
          <Image src={arrow.src} width="12" height="12" alt="아래를 가르키는 화살표 이미지" priority />
        </div>
      </div>
      {isOpen && (
        <ul className={isOpen ? styles.dropdown : styles.hidden}>
          {data.map((option, index) => (
            <li key={index} className={styles.list} onClick={() => handleItemClick(option)}>
              <DropDownItem data={option} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

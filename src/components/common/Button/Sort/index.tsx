import { useState } from 'react';

import styles from './SortButton.module.scss';
import SortBottomSheet from '@/components/common/Modal/SortBottomSheet';
import classNames from 'classnames/bind';
import ArrowIcon from '@/assets/svgs/bottom-arrow-gray.svg';

interface Option {
  name: string;
  value: string;
}
interface SortButtonProps {
  className?: string;
  options: Option[];
  initialOptionValue: string | string[] | undefined;
  onClick: (value: string) => void;
}

const cx = classNames.bind(styles);

/*
  사용⭐️)

  export function getServerSideProps(context: GetServerSidePropsContext) {
    const sort = context.query['sort'] || '0';

    return {
      props: {
        sort,
      },
    };
  }

  interface ExampleProps {
    sort: string;
  }

  export default function Example({ sort }: ExampleProps) {
    return (
      <div>
        <SortButton
          options={[
            { name: '최신순', value: '0' },
            { name: '별점 높은 순', value: '1' },
          ]}
          initialOptionValue={sort}
          onClick={value => console.log(value)}
        />
      </div>
    );
  }
*/
export default function SortButton({ className, options, initialOptionValue, onClick }: SortButtonProps) {
  const initialSelectedOption = options.find(option => option.value === initialOptionValue) || options[0];
  const [selectedOption, setSelectedOption] = useState<Option>(initialSelectedOption);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClickOption = (option: Option) => {
    setSelectedOption(option);

    if (typeof onClick === 'function') {
      onClick(option.value);
    }

    setIsOpen(false);
  };

  return (
    <div>
      <button className={cx('button', className)} onClick={handleOpen}>
        {selectedOption.name}
        <ArrowIcon />
      </button>
      {isOpen && (
        <SortBottomSheet.Root isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {options.map(({ name, value }) => (
            <SortBottomSheet.Item
              key={name}
              isSelected={selectedOption.name === name}
              onClick={() => handleClickOption({ name, value })}>
              {name}
            </SortBottomSheet.Item>
          ))}
        </SortBottomSheet.Root>
      )}
    </div>
  );
}

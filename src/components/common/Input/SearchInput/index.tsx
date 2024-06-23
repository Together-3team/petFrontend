import { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './SearchInput.module.scss';
import SearchIcon from '@/assets/svgs/search.svg';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const cx = classNames.bind(styles);

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ className, ...rest }, ref) => {
  return (
    <div className={cx('container', className)}>
      <input className={styles.input} ref={ref} {...rest} />
      <button type="submit" className={styles.icon}>
        <SearchIcon />
      </button>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;

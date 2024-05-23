import { forwardRef, ChangeEvent } from 'react';
import Image, { ImageProps } from 'next/image';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

interface InputProps {
  id: string;
  type: string;
  label?: string;
  size?: string;
  border?: string;
  isError?: boolean;
  errorText?: string;
  labelStyle?: string;
  placeholder: string;
  imageProps?: Partial<ImageProps>;
  background?: string;
}

const cx = classNames.bind(styles);

const InputLayout = forwardRef<HTMLInputElement, InputProps>(function InputLayout(
  { id, label, isError, errorText, labelStyle, size, border, imageProps, background, ...rest },
  ref
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (ref && 'current' in ref && ref.current) {
      ref.current.value = event.target.value;
    }
  };
  return (
    <div className={cx('inputWithLabel')}>
      {label && (
        <label htmlFor={id} className={cx(labelStyle)}>
          {label}
        </label>
      )}
      <div className={cx('inputWithIcon', size)}>
        <input
          ref={ref}
          className={cx(border, { error: isError }, size, background)}
          onChange={handleChange}
          {...rest}
        />
        {imageProps && (
          <Image
            src="/images/search.svg"
            alt="검색 아이콘"
            width={24}
            height={24}
            className={cx('icon')}
            {...imageProps}
          />
        )}
      </div>
      {isError && <p className={cx('errorText')}>{errorText}</p>}
    </div>
  );
});

export default InputLayout;

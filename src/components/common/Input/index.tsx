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

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, isError, errorText, labelStyle, size, border, imageProps, background, ...rest },
  ref
) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (ref && 'current' in ref && ref.current) {
      ref.current.value = event.target.value;
    }
  }
  return (
    <div className={cx('inputWithLabel')}>
      {label && (
        <label htmlFor={id} className={cx(labelStyle)}>
          {label}
        </label>
      )}
      <div className={cx({ inputWithIcon: imageProps })}>
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

export default Input;

{
  /* 사용법
  기본: <Input id="" type="text" size={''} label=" " labelStyle="label" placeholder="" background={''} />;
  1. 닉네임 인풋
      <Input
        id = ""
        type="text"
        size="large"
        label=" "
        labelStyle={'label'}
        placeholder="닉네임을 입력해주세요"
      />
  2.  사이즈 큰 검색 인풋
      <Input
        id = ""
        type="text"
        size="mediumLarge"
        border={'roundBorder'}
        label=" "
        labelStyle={'label'}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={'background'}
      />
  3. 사이즈 작은 검색 인풋
      <Input
        id = ""
        type="text"
        size="medium"
        border={'roundBorder'}
        label=" "
        labelStyle={'label'}
        placeholder="검색어를 입력해주세요"
        imageProps={{}}
        background={'background'}
      /> */
}

import Image, { ImageProps } from 'next/image';
import classNames from 'classnames/bind';
import styles from './ImageBox.module.scss';

interface ImageBox extends ImageProps {
  size: 'myPageFirstPhoto' | 'petPhoto' | 'welcomePetPhoto' | string;
  src: string;
  alt: string;
  disabled?: boolean;
}

const cx = classNames.bind(styles);

export default function ImageBox({ size, src, alt, disabled, ...props }: ImageBox) {
  return (
    <>
      {disabled && <div className={cx('disabled', size)} />}
      <div className={cx('imageBox', size)}>
        <Image src={src} alt={alt} fill {...props} />
      </div>
    </>
  );
}

{
  /* 사용법
  <ImageBox size={'my'} src="/images/search.svg" alt="검색 아이콘" disabled />
  <ImageBox size={'my'} src="/images/search.svg" alt="검색 아이콘" />
  */
}

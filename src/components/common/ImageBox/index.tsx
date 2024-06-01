import Image, { ImageProps, StaticImageData } from 'next/image';
import classNames from 'classnames/bind';
import styles from './ImageBox.module.scss';

interface ImageBox extends ImageProps {
  size: 'myPageFirstPhoto' | 'petPhoto' | 'welcomePetPhoto' | string;
  src: StaticImageData;
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
  import Sample from '@/assets/exampleProductImg.jpg';
  <ImageBox size={'my'} src={Sample} alt="설이 이미지" disabled />
  <ImageBox size={'my'} src={Sample} alt="설이 이미지" />
  */
}

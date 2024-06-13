import classNames from 'classnames/bind';
import styles from './DetailedDescription.module.scss';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Arrow from '@/assets/svgs/arrow-down-pink.svg';

const cx = classNames.bind(styles);

interface DetailedDescriptionProps {
  descriptionImages: string[];
}

export default function DetailedDescription({ descriptionImages }: DetailedDescriptionProps) {
  return (
    <div className={cx('contents')}>
      <h2 className={cx('title')}>상품 설명</h2>
      {descriptionImages.map((image, i) => {
        return (
          <Image
            key={i}
            src={image}
            alt={`상품 상세 이미지${i}`}
            layout="responsive"
            width={100}
            height={100}
            blurDataURL={'@/assets/svgs/rectangle.svg'}
            placeholder="blur"
          />
        );
      })}
      <Button size="extraLarge" backgroundColor="$color-white-pink">
        <Arrow />
        <span className={cx('buttonDescription')}>상품 설명 전체보기</span>
      </Button>
    </div>
  );
}

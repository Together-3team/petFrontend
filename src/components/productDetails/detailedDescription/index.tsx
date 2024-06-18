import classNames from 'classnames/bind';
import styles from './DetailedDescription.module.scss';
import Image from 'next/image';
import Button from '@/components/common/Button';
import Arrow from '@/assets/svgs/arrow-down-pink.svg';
import { useState } from 'react';

const cx = classNames.bind(styles);

interface DetailedDescriptionProps {
  descriptionImages: string[];
}

export default function DetailedDescription({ descriptionImages }: DetailedDescriptionProps) {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  // 보여줄 이미지 수 (전체보기 이전에는 2장만)
  const imagesToShow = showAll ? descriptionImages : descriptionImages.slice(0, 1);
  return (
    <div className={cx('contents')}>
      <h2 className={cx('title')}>상품 설명</h2>
      {imagesToShow.map((image, i) => {
        return (
          <div key={i} className={styles.imageWrapper}>
            <Image
              src={image}
              alt={`상품 상세 이미지${i}`}
              layout="responsive"
              width={100}
              height={100}
              blurDataURL={'@/assets/svgs/rectangle.svg'}
              placeholder="blur"
              style={{ display: 'block' }}
            />
            {!showAll && i === 0 && <div className={styles.gradientOverlay}></div>}
          </div>
        );
      })}
      {!showAll && (
        <div style={{ margin: '16px' }}>
          <Button size="large" backgroundColor="$color-white-pink" onClick={handleToggle}>
            <Arrow />
            <span className={cx('buttonDescription')}>상품 설명 전체보기</span>
          </Button>
        </div>
      )}
      {showAll && (
        <div style={{ margin: '16px' }}>
          <Button size="extraLarge" backgroundColor="$color-white-pink" onClick={handleToggle}>
            <Arrow />
            <span className={cx('buttonDescription')}>상품 정보 접기</span>
          </Button>
        </div>
      )}
    </div>
  );
}

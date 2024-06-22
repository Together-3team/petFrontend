import classNames from 'classnames/bind';
import styles from './DetailedDescription.module.scss';
import Image from 'next/image';
import Button from '@/components/common/Button';
import ArrowDown from '@/assets/svgs/arrow-down-pink.svg';
import ArrowUp from '@/assets/svgs/arrow-up-pink.svg';
import { useState } from 'react';
import rectangle from '@/assets/images/rectangle.png';

const cx = classNames.bind(styles);

interface DetailedDescriptionProps {
  descriptionImages: string;
}

export default function DetailedDescription({ descriptionImages }: DetailedDescriptionProps) {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className={cx('contents')}>
      <h2 className={cx('title')}>상품 설명</h2>
      <div className={cx('imageContainer', showAll ? 'showAll' : '')}>
        <Image
          src={descriptionImages || rectangle.src}
          alt={`상품 상세 이미지`}
          layout="responsive"
          width={100}
          height={100}
          blurDataURL={'@/assets/svgs/rectangle.svg'}
          placeholder="blur"
          style={{ display: 'block' }}
        />
        {!showAll && <div className={styles.gradientOverlay}></div>}
      </div>

      {!showAll && (
        <div style={{ margin: '16px' }}>
          <Button size="large" backgroundColor="$color-white-pink" onClick={handleToggle}>
            <ArrowDown />
            <span className={cx('buttonDescription')}>상품 설명 전체보기</span>
          </Button>
        </div>
      )}
      {showAll && (
        <div style={{ margin: '16px' }}>
          <Button size="large" backgroundColor="$color-white-pink" onClick={handleToggle}>
            <ArrowUp />
            <span className={cx('buttonDescription')}>상품 정보 접기</span>
          </Button>
        </div>
      )}
    </div>
  );
}

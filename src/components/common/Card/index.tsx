import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import Tag from '../Tag';
import { useEffect, useRef, useState } from 'react';

type ProductInfo = {
  title: string;
  thumbNailImage: string;
  originalPrice: number;
  discountRate: number;
  price: number;
  starRating: number;
  reviewCount: number;
  stock: number;
};

type CardProps = {
  productInfo: ProductInfo;
  wishList?: boolean;
  direction?: 'column' | 'row';
  size: 'big' | 'small';
};

const cx = classNames.bind(styles);

export default function Card({ productInfo, wishList = false, direction = 'column', size = 'big' }: CardProps) {
  const { title, thumbNailImage, originalPrice, discountRate, price, starRating, reviewCount, stock } = productInfo;

  const titleRef = useRef<HTMLDivElement | null>(null);

  const [titleInnerBoxClassName, setTitleInnerBoxClassName] = useState('');
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      const titleWidth = titleElement.offsetWidth;
      if (size === 'big' && titleWidth > 140 && direction === 'column') {
        document.documentElement.style.setProperty('--big-title-width', `${titleWidth}px`);
        setTitleInnerBoxClassName('bigTitleInnerBox');
      }
      if (size === 'small' && titleWidth > 100 && direction === 'column') {
        document.documentElement.style.setProperty('--small-title-width', `${titleWidth}px`);
        setTitleInnerBoxClassName('smallTitleInnerBox');
      }
    }
  }, []);

  return (
    <Link
      href={`/product/${title}`}
      className={cx('card')}
      style={{
        flexDirection: direction === 'column' ? 'column' : 'row',
        width: size === 'big' ? '140px' : direction === 'row' ? '300px' : '100px',
      }}>
      <div
        className={cx('cardImage')}
        style={{ width: size === 'big' ? '140px' : '100px', height: size === 'big' ? '140px' : '100px' }}>
        <Image src={thumbNailImage} alt={title} fill />
        {/* 찜하기 버튼 */}
      </div>
      <div className={cx('cardContent')} style={{ margin: size === 'big' ? '12px 0' : '4px 0' }}>
        <div className={cx('titleBox')} style={{ height: size === 'big' ? '20px' : '12px' }}>
          <div className={cx(titleInnerBoxClassName)}>
            <h3 className={cx('title')} ref={titleRef} style={{ fontSize: size === 'big' ? '14px' : '10px' }}>
              {title}
            </h3>
            {titleInnerBoxClassName && direction === 'column' && (
              <h3 className={cx('title')} style={{ fontSize: size === 'big' ? '14px' : '10px' }}>
                {title}
              </h3>
            )}
          </div>
        </div>
        <p className={cx('originalPrice')} style={{ fontSize: size === 'big' ? '12px' : '8px' }}>
          {originalPrice}원
        </p>
        <div className={cx('discountedPrice')}>
          <p className={cx('discountRate')} style={{ fontSize: size === 'big' ? '16px' : '12px' }}>
            {discountRate}%
          </p>
          <p className={cx('price')} style={{ fontSize: size === 'big' ? '16px' : '12px' }}>
            {price}원
          </p>
        </div>
        <div className={cx('star')}>
          <Image src={'/images/star.svg'} alt="별" width={9.5} height={9.5} />
          <p className={cx('starRating')} style={{ fontSize: size === 'big' ? '10px' : '8px' }}>
            {starRating}
          </p>
        </div>
        {direction === 'column' && (
          <div className={cx('tags')}>
            {stock <= 10 && (
              <Tag size={size === 'big' ? 'big' : 'small'} type="stock">
                10개 미만
              </Tag>
            )}
            {reviewCount >= 100 && (
              <Tag size={size === 'big' ? 'big' : 'small'} type="thumbs-up">
                리뷰 100+
              </Tag>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

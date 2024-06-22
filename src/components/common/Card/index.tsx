import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import Tag from '../Tag';
import Zzim from '../Zzim';
import StarIcon from '@/assets/svgs/star.svg';
import styles from './Card.module.scss';
import rectangleImg from '@/assets/images/rectangle.png';

export interface ProductInfo {
  productId: number;
  id?: number;
  title: string;
  thumbNailImage: string;
  originalPrice: number;
  price: number;
  starRating?: number;
  reviewCount?: number;
  stock: number;
  option?: string;
  quantity?: number;
  combinationName?: string;
  status?: number;
  paymentStatus?: number;
}

interface CardProps {
  productInfo: ProductInfo;
  isZzim?: boolean;
  direction?: 'column' | 'row';
  size: 'extraLarge' | 'large' | 'small' | 'miniImage';
  tagText?: string;
  href?: string;
}

const cx = classNames.bind(styles);

// direction="row"는 꼭 size="small" 또는 "miniImage"와 함께 사용

export default function Card({
  href,
  productInfo,
  isZzim = false,
  direction = 'column',
  size = 'large',
  tagText,
}: CardProps) {
  const {
    productId,
    title,
    thumbNailImage,
    originalPrice,
    price,
    starRating,
    reviewCount = 0,
    quantity,
    stock,
  } = productInfo;

  const discountRate = Math.ceil((1 - price / originalPrice) * 100);

  const [imageSrc, setImgSrc] = useState(thumbNailImage);

  const handleImgError = () => {
    setImgSrc(rectangleImg.src);
  };

  return (
    <Link href={href || `/products/${productId}`} className={cx('card')} data-direction={direction} data-size={size}>
      <div className={cx('cardImage')} data-direction={direction} data-size={size}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          blurDataURL={'@/assets/svgs/rectangle.svg'}
          placeholder="blur"
          sizes={
            size === 'extraLarge'
              ? '(max-width: 156px) 100vw, 150px'
              : size === 'large'
                ? '(max-width: 140px) 100vw, 140px'
                : size === 'small'
                  ? '(max-width: 100px) 100vw, 100px'
                  : '(max-width: 80px) 80vw, 80px'
          }
          onError={handleImgError}
        />
        {isZzim && <Zzim className={cx('zzim')} color="white" productId={productId} />}
      </div>
      <div className={cx('cardContent')} data-direction={direction} data-size={size}>
        {size === 'miniImage' && tagText && (
          <Tag size="medium" color="$color-gray-100">
            {tagText}
          </Tag>
        )}
        <div className={cx('titleBox')} data-direction={direction} data-size={size}>
          <div className={cx('title')} data-stock={stock} data-direction={direction} data-size={size}>
            {title}
          </div>
        </div>
        {stock === 0 && <p className={cx('outOfStock')}>품절된 상품이에요</p>}
        {stock > 0 && (
          <p className={cx('originalPrice')} data-direction={direction} data-size={size}>
            {originalPrice.toLocaleString('ko-KR')}원
          </p>
        )}
        {stock > 0 && (
          <div className={cx('discountedPrice')}>
            <p className={cx('discountRate')} data-direction={direction} data-size={size}>
              {discountRate}%
            </p>
            <p className={cx('price')} data-direction={direction} data-size={size}>
              {price.toLocaleString('ko-KR')}원
            </p>
          </div>
        )}
        {direction === 'column' && starRating !== null && starRating !== undefined && (
          <div className={cx('star')}>
            <StarIcon alt="별" width={9.5} height={9.5} />
            <p className={cx('starRating')} data-size={size}>
              {starRating}
            </p>
          </div>
        )}
        {direction === 'column' && stock > 0 && (
          <div className={cx('tags')} data-size={size}>
            {stock <= 10 && (
              <Tag size={size === 'large' || 'extraLarge' ? 'large' : 'small'} type="stock" color="#FFF3F3">
                10개 미만
              </Tag>
            )}
            {reviewCount >= 100 && (
              <Tag size={size === 'large' || 'extraLarge' ? 'large' : 'small'} type="thumbsUp" color="#E5FAFC">
                리뷰 100+
              </Tag>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

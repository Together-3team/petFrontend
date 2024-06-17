import { useEffect, useRef, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import Tag from '../Tag';
import Zzim from '../Zzim';
import StarIcon from '@/assets/svgs/star.svg';
import styles from './Card.module.scss';

export interface ProductInfo {
  productId: number;
  title: string;
  thumbNailImage: string;
  originalPrice: number;
  price: number;
  starRating?: number;
  reviewCount?: number;
  stock: number;
  option?: string;
  quantity?: number;
}

interface CardProps {
  productInfo: ProductInfo;
  isZzim?: boolean;
  direction?: 'column' | 'row';
  size: 'big' | 'small' | 'miniImage';
  tagText?: string;
}

const cx = classNames.bind(styles);

// direction="row"는 꼭 size="small" 또는 "miniImage"와 함께 사용
// option은 string으로 받는 것으로 생각 ex) 닭고기/ 가슴살

export default function Card({ productInfo, isZzim = false, direction = 'column', size = 'big', tagText }: CardProps) {
  const {
    productId,
    title,
    thumbNailImage,
    originalPrice,
    price,
    starRating,
    reviewCount = 0,
    stock,
    option,
    quantity,
  } = productInfo;

  // title 길이에 따라 흐르게 할지말지 정한다.
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [titleInnerBoxClassName, setTitleInnerBoxClassName] = useState('');
  const [titleWidth, setTitleWidth] = useState(0);

  const discountRate = Math.ceil((1 - price / originalPrice) * 100);

  //title이 큰 카드, 작은 카드 각각의 너비를 초과하면 글씨가 흐르도록 함
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      const titleWidth = titleElement.offsetWidth;
      if (size === 'big' && stock > 0 && titleWidth > 140 && direction === 'column') {
        setTitleInnerBoxClassName('titleInnerBox');
        setTitleWidth(titleWidth);
      }
      if (size === 'small' && stock > 0 && titleWidth > 100 && direction === 'column') {
        setTitleInnerBoxClassName('titleInnerBox');
        setTitleWidth(titleWidth);
      }
    }
  }, [direction, size, stock]);

  //카드 각각에서 글씨가 흐르는 시간을 같게 조정
  const animationDuration = titleWidth / 50;

  return (
    <Link
      href={`/product/${title}`}
      className={cx('card')}
      as="image"
      data-direction={direction}
      data-size={size}
      style={
        {
          '--title-width': `${titleWidth}px`,
          '--animation-duration': `${animationDuration}s`,
        } as React.CSSProperties
      }>
      <div className={cx('cardImage')} data-direction={direction} data-size={size}>
        <Image
          src={thumbNailImage}
          alt={title}
          fill
          blurDataURL={'@/assets/svgs/rectangle.svg'}
          placeholder="blur"
          sizes={
            size === 'big'
              ? '(max-width: 140px) 100vw, 140px'
              : size === 'small'
                ? '(max-width: 100px) 100vw, 100px'
                : '(max-width: 80px) 80vw, 80px'
          }
        />
        {isZzim && <Zzim className={cx('zzim')} color="white" productId={productId} />}
      </div>
      <div className={cx('cardContent')} data-direction={direction} data-size={size}>
        {size === 'miniImage' && <Tag size="medium">{tagText}</Tag>}
        <div className={cx('titleBox')} data-direction={direction} data-size={size}>
          <div className={cx(titleInnerBoxClassName)}>
            <div className={cx('title')} ref={titleRef} data-stock={stock} data-direction={direction} data-size={size}>
              {title}
            </div>
            {titleInnerBoxClassName && direction === 'column' && stock > 0 && (
              <h3 className={cx('secondTitle')} data-direction={direction} data-size={size}>
                {title}
              </h3>
            )}
          </div>
        </div>
        {option && quantity && (
          <p className={cx('option')}>
            {option}|{quantity}개
          </p>
        )}
        {stock === 0 && <p className={cx('outOfStock')}>품절된 상품이에요</p>}
        {stock > 0 && (
          <p className={cx('originalPrice')} data-direction={direction} data-size={size}>
            {originalPrice}원
          </p>
        )}
        {stock > 0 && (
          <div className={cx('discountedPrice')}>
            <p className={cx('discountRate')} data-direction={direction} data-size={size}>
              {discountRate}%
            </p>
            <p className={cx('price')} data-direction={direction} data-size={size}>
              {price}원
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
              <Tag size={size === 'big' ? 'large' : 'small'} type="stock" color="#FFF3F3">
                10개 미만
              </Tag>
            )}
            {reviewCount >= 100 && (
              <Tag size={size === 'big' ? 'large' : 'small'} type="thumbsUp" color="#E5FAFC">
                리뷰 100+
              </Tag>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

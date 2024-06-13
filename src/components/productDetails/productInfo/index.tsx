import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProductInfo.module.scss';
import { useEffect, useState } from 'react';
import StarRating from '@/components/common/review/StarRating';
import Tag from '@/components/common/Tag';
import BannerCarousel from '@/components/common/Carousel/Banner';
import ProductCarousel from '@/components/common/Carousel/Product';
import Delivery from '@/assets/svgs/delivery.svg';

const cx = classNames.bind(styles);

interface ImagesInfo {
  src: string;
  alt: string;
}

interface ProductInfoProps {
  productImages: ImagesInfo[];
  title: string;
  originalPrice: number;
  price: number;
  reviewRating: number;
  reviewCount: number;
}

export default function ProductInfo({
  productImages,
  title,
  originalPrice,
  price,
  reviewRating,
  reviewCount,
}: ProductInfoProps) {
  const discountRate = Math.ceil((1 - price / originalPrice) * 100);
  return (
    <>
      <div className={cx('imageContainer')}>
        <ProductCarousel items={productImages} />
      </div>
      <div className={cx('productInfoContent')}>
        <h1 className={cx('title')}>{title}</h1>
        <p className={cx('originalPrice')}>{originalPrice}</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span className={cx('discountRate')}>{discountRate}%</span>
          <span className={cx('price')}>{price}</span>
        </div>
        <div className={cx('review')}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <StarRating rating={reviewRating} />
            <span>{reviewRating}</span>
          </div>
          <span className={cx('reviewCount')}>리뷰 {reviewCount}개</span>
        </div>
        <div className={cx('tags')}>
          <Tag size="huge" type="stock" color="#FFF3F3" fontColor="#FE5A65">
            10개 미만
          </Tag>
          <Tag size="huge" type="thumbsUp" color="#E5FAFC" fontColor="#34BACC">
            리뷰 100+
          </Tag>
        </div>
        <div className={cx('shippingInfo')}>
          <Delivery width={24} height={24} />
          지금 주문하면 전 도착 예정{' '}
        </div>
      </div>
    </>
  );
}

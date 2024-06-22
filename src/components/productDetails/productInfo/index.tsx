import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProductInfo.module.scss';
import { useEffect, useState } from 'react';
import StarRating from '@/components/common/review/StarRating';
import Tag from '@/components/common/Tag';
import BannerCarousel from '@/components/common/Carousel/Banner';
import ProductCarousel from '@/components/common/Carousel/Product';
import Delivery from '@/assets/svgs/delivery.svg';
import getFutureDate from '@/utils/getFutureDate';
import { Product } from '@/types/product';

const cx = classNames.bind(styles);

export default function ProductInfo({ product }: { product: Product }) {
  const { detail, title, originalPrice, price, averageRating, reviewCount, totalAmount } = product;
  const { productImages } = detail;
  const discountRate = Math.ceil((1 - price / originalPrice) * 100);
  const futureDate = getFutureDate(3);
  return (
    <div className={cx('contents')}>
      <div className={cx('imageContainer')}>
        <ProductCarousel images={productImages} />
      </div>
      <div className={cx('productInfoContent')}>
        <h1 className={cx('title')}>{title}</h1>
        <p className={cx('originalPrice')}>{originalPrice}원</p>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span className={cx('discountRate')}>{discountRate}%</span>
          <span className={cx('price')}>{price}원</span>
        </div>
        <div className={cx('review')}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <StarRating rating={averageRating} />
            <span className={cx('reviewRating')}>{averageRating}</span>
          </div>
          <span className={cx('reviewCount')}>리뷰 {reviewCount}개</span>
        </div>
        <div className={cx('tags')}>
          {totalAmount <= 10 && (
            <Tag size="extraLarge" type="stock" color="#FFF3F3" fontColor="#FE5A65">
              10개 미만
            </Tag>
          )}
          {reviewCount >= 100 && (
            <Tag size="extraLarge" type="thumbsUp" color="#E5FAFC" fontColor="#34BACC">
              리뷰 100+
            </Tag>
          )}
        </div>
        <div className={cx('shippingInfo')}>
          <Delivery width={24} height={24} />
          지금 주문하면 {futureDate} 전 도착 예정
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './ProductInfo.module.scss';
import { useEffect, useState } from 'react';
import StarRating from '@/components/common/review/StarRating';
import Tag from '@/components/common/Tag';
import BannerCarousel from '@/components/common/Carousel/Banner';
import ProductCarousel from '@/components/common/Carousel/Product';

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
        {/* <Image
          className={cx('thumbNailImage')}
          src={thumbNailImage}
          alt={`${title}-image`}
          blurDataURL={'@/assets/svgs/rectangle.svg'}
          placeholder="blur"
          fill
        /> */}
        <ProductCarousel items={productImages} />
      </div>
      <h1 className={cx('title')}>{title}</h1>
      <p>{originalPrice}</p>
      <span>{discountRate}</span>
      <span>{price}</span>
      <StarRating rating={reviewRating} />
      리뷰 {reviewCount}개
      <div>
        <Tag size="huge" type="stock" color="#FFF3F3" fontColor="#FE5A65">
          10개 미만
        </Tag>
        <Tag size="huge" type="thumbsUp" color="#E5FAFC" fontColor="#34BACC">
          리뷰 100+
        </Tag>
      </div>
    </>
  );
}

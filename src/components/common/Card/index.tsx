import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from './Card.module.scss';
import Tag from '../Tag';

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
  wishList: boolean;
};

export default function Card({ productInfo, wishList }: CardProps) {
  const { title, thumbNailImage, originalPrice, discountRate, price, starRating, reviewCount, stock } = productInfo;

  return (
    <Link href={`/product/${title}`}>
      <Image src={thumbNailImage} alt={title} width={500} height={300} />
      <button>
        <Image src={'heart'} alt="찜하기" />
      </button>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{originalPrice}</p>
        <p>{discountRate}%</p>
        <p>{price}</p>
        <Image src={'/path/to/star-image.png'} alt="별" />
        <p>{starRating}</p>
        <div className={styles.tags}>
          {stock <= 10 && <Tag>재고 10개 미만</Tag>}
          {reviewCount >= 100 && <Tag>리뷰 100개 이상</Tag>}
        </div>
      </div>
    </Link>
  );
}

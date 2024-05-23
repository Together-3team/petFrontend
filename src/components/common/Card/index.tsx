import Image from 'next/image';
import Link from 'next/link';

import styles from './Card.module.scss';

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
};

export default function Card({ productInfo }: CardProps) {
  const { title, thumbNailImage, originalPrice, discountRate, price, starRating, reviewCount, stock } = productInfo;

  return (
    <Link href={`/product/${title}`}>
      <Image src={thumbNailImage} alt={title} width={500} height={300} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{originalPrice}</p>
        <p>{discountRate}%</p>
        <p>{price}</p>
        <Image src={'/path/to/star-image.png'} alt="별" />
        <p>{starRating}</p>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            //태그 컴포넌트 만들기
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

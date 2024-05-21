import Image from 'next/image';
import Link from 'next/link';

type CardInfo = {
  title: string;
  imageUrl: string;
  price: number;
  discountRate: number;
  discountedPrice: number;
  starRating: number;
  tags: string[];
};

type CardProps = {
  cardInfo: CardInfo;
};

export default function Card({ cardInfo }: CardProps) {
  const { title, imageUrl, price, discountRate, discountedPrice, starRating, tags } = cardInfo;
  return (
    <Link href={`/product/${title}`}>
      <Image src={imageUrl} alt={title} width={500} height={300} />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{price}</p>
        <p>{discountRate}%</p>
        <p>{discountedPrice}</p>
        <Image src={'별 이미지'} alt="별" />
        <p>{starRating}</p>
        <div className="tags">
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

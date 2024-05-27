import Card from '@/components/common/Card';
import styles from './Card.module.scss';

export default function CardPage() {
  const productList = {
    id: 1,
    title: '진짜 육포',
    thumbNailImage:
      'https://images.chosun.com/resizer/n1Uq1hPup9kGjjjffEdLd_Wuyaw=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NFEJHXFOLTGNUBBT3NZIUBVJ4A.jpg',
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList2 = {
    id: 2,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage:
      'https://images.chosun.com/resizer/n1Uq1hPup9kGjjjffEdLd_Wuyaw=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NFEJHXFOLTGNUBBT3NZIUBVJ4A.jpg',
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList3 = {
    id: 3,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage:
      'https://images.chosun.com/resizer/n1Uq1hPup9kGjjjffEdLd_Wuyaw=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NFEJHXFOLTGNUBBT3NZIUBVJ4A.jpg',
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
  };
  return (
    <div className={styles.cards}>
      <Card productInfo={productList} size="big" />
      <Card productInfo={productList} size="small" />
      <Card productInfo={productList2} wishList={true} size="big" />
      <Card productInfo={productList3} direction="row" size="small" />
    </div>
  );
}

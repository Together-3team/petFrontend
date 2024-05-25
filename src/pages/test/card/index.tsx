import Card from '@/components/common/Card';

export default function CardPage() {
  const productList = {
    title: '진짜 육포 12종 모음입니다아아아아아아',
    thumbNailImage:
      'https://images.chosun.com/resizer/n1Uq1hPup9kGjjjffEdLd_Wuyaw=/464x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/NFEJHXFOLTGNUBBT3NZIUBVJ4A.jpg',
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  return (
    <div>
      <Card productInfo={productList} size="big" />
      <Card productInfo={productList} size="small" />
      <Card productInfo={productList} wishList={true} size="big" />
      <Card productInfo={productList} direction="row" size="small" />
    </div>
  );
}

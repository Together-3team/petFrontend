import Card from '@/components/common/Card';
import styles from './Card.module.scss';
import rectangleImg from '@/assets/images/rectangle.png';

export default function CardPage() {
  const productList = {
    id: 1,
    title: '진짜 육포',
    thumbNailImage: rectangleImg.src,
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
    thumbNailImage: rectangleImg.src,
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
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 10,
  };
  const productList6 = {
    id: 6,
    title: '진짜 육포입니다람쥐이이이이이이이이이',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    option: '닭가슴살맛',
    quantity: 2,
    stock: 0,
  };
  const productList4 = {
    id: 1,
    title: '진짜 육포라니이이이이이잉',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList5 = {
    id: 1,
    title: '진짜 육포다라마바사아자차카타파하호호호호히히히히히히히히햏헤해햏',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 3,
  };
  const productList7 = {
    id: 1,
    title: '진짜 육포다라마바사아자차카타파하호호호호히히히히히히히히햏헤해햏',
    thumbNailImage: rectangleImg.src,
    originalPrice: 12000,
    discountRate: 10,
    price: 10800,
    starRating: 4.5,
    reviewCount: 200,
    stock: 0,
  };
  return (
    <div className={styles.cards}>
      <Card productInfo={productList} size="big" />
      <Card productInfo={productList} size="small" />
      <Card productInfo={productList2} wishList={true} size="big" />
      <Card productInfo={productList3} direction="row" size="small" />
      <Card productInfo={productList6} direction="row" size="small" />
      <Card productInfo={productList4} size="big" />
      <Card productInfo={productList5} size="big" />
      <Card productInfo={productList7} size="big" />
    </div>
  );
}
